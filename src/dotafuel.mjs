export const fuelSlug=id=>({'outworld-destroyer':'outworld-devourer',ringmaster:'ring-master'})[id]||id;
const fuelId=slug=>({'outworld-devourer':'outworld-destroyer','ring-master':'ringmaster'})[slug]||slug;
export function parseFuelPage(html,enemy,heroes,labels={}){
 const heading=/<h3\b[^>]*>\s*Our counter picks\s*<\/h3>/i.exec(html);if(!heading)throw Error('DotaFuel hand-picked section is missing for '+enemy+'.');
 const start=html.lastIndexOf('<section',heading.index),end=html.indexOf('</section>',heading.index);if(start<0||end<0)throw Error('DotaFuel section format changed.');const section=html.slice(start,end);
 if(!/Heroes we hand picked for their interesting counter interactions/i.test(section))throw Error('DotaFuel manual provenance label is missing.');
 const ids=new Set(heroes.map(h=>h.id)),prefixes=heroes.map(h=>h.img+'_').sort((a,b)=>b.length-a.length),edges=[];
 for(const article of section.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)){const slug=article[1].match(/href="(?:https:\/\/dotafuel\.com)?\/heroes\/([a-z0-9-]+)"/)?.[1];if(!slug)throw Error('DotaFuel counter hero is missing.');const counter=fuelId(slug);if(!ids.has(counter))throw Error('Unmapped DotaFuel hero: '+slug);if(counter===enemy)throw Error('DotaFuel self-counter rejected.');
 const icons=[...new Set([...article[1].matchAll(/\/dota_react\/abilities\/([a-z0-9_]+)\.png/g)].map(m=>m[1]))];const abilities=icons.map(icon=>labels[icon]||icon.slice((prefixes.find(p=>icon.startsWith(p))||'').length).replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase()));
 if(!edges.some(e=>e.counter===counter))edges.push({enemy,counter,phase:'game',tier:'unrated',abilities,group:false,source:'dotafuel',url:'https://dotafuel.com/heroes/'+fuelSlug(enemy)+'/counters'});
 }
 if(!edges.length||edges.length>20)throw Error('Unexpected DotaFuel manual pick count for '+enemy+'.');return edges;
}
