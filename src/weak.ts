import { NS } from "@ns";

export async function main(ns: NS){
    const target = ns.args[0];
    // eslint-disable-next-line no-constant-condition
    while(true){
        await ns.weaken(target.toString());
    }
}