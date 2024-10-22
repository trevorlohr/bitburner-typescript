import { NS } from "@ns";

export function getNumOfThreadsPerTarget(ns: NS, node: string, numOfTargets: number, script: string) {
    const scriptRam = ns.getScriptRam(script, node);
    const totalRam = ns.getServerMaxRam(node);
    const ram = totalRam;
    const divider = ram / numOfTargets;

    return Math.floor(divider / scriptRam);

}

export async function runHack(ns: NS, script: string, node: string, numOfThreads: number, target: string) {
    if(!(numOfThreads > 0) || ns.isRunning("node-hack.js", node, target) || !ns.hasRootAccess(node)){
        return 0;
    }
    else{

        const res = await ns.exec(script,node,numOfThreads, target);
        if(res > 0){
            ns.tprint("runHack succeeded on " + node + " for "+ target);
        }else{
            ns.tprint("runHack failed on " + node + " for "+ target);
        }
        return;
    }
        
}
