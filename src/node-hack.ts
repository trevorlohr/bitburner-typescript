import { NS } from "@ns";

export async function main(ns: NS){
    const target: string = ns.args[0].toString();
    // eslint-disable-next-line no-constant-condition
    while(true){
        const currentSec = ns.getServerSecurityLevel(target);
        const hackFlag = (ns.getServerMaxMoney(target) * .9 <= ns.getServerMoneyAvailable(target));
        if(hackFlag === true){
            await ns.hack(target);
        }
        else if(hackFlag === false && currentSec > ns.getServerMinSecurityLevel(target) + 5){
            await ns.weaken(target);
        }
        else if(hackFlag === false){
            await ns.grow(target);
        }
    }
}   