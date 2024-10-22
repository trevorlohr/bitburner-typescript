import { NS } from "@ns";

export function serverReset(ns: NS){
    const servers = ns.getPurchasedServers();
    for (const server of servers) {
        if(server !== "home"){
            ns.killall(server);
        }
    }
}
export function nodeReset(ns: NS){
    const nodes = ns.read("foundnodes.txt");
    for (const node of nodes.split(",")) {
        if(ns.hasRootAccess(node)===true && node !== "home"){
            ns.killall(node);
        }
    }
}