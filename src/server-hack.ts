import { NS } from "@ns";

export async function main(ns: NS){
    const target = ns.args[0];
    // eslint-disable-next-line no-constant-condition
    while(true){
        const currentSec = ns.getServerSecurityLevel(target.toString());
        const hackFlag = (ns.getServerMaxMoney(target.toString()) * .9 <= ns.getServerMoneyAvailable(target.toString()));
        if(hackFlag === true){
            await ns.hack(target.toString());
        }
        else if(hackFlag === false && currentSec > ns.getServerMinSecurityLevel(target.toString()) + 5){
            await ns.weaken(target.toString());
        }
        else if(hackFlag === false){
            await ns.grow(target.toString());
        }
    }
}