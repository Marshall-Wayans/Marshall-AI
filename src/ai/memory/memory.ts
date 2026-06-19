export interface Memory {
 key:string;
 value:string;
 createdAt:number;
}


export function saveMemory(memory:Memory){

localStorage.setItem(
 memory.key,
 JSON.stringify(memory)
)

}


export function getMemory(key:string){

const data =
localStorage.getItem(key)

return data
? JSON.parse(data)
:null

}