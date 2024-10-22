import { NS } from "@ns";

import { Server } from "Server.js";
import {getNumOfThreadsPerTarget} from "hackutility.js";
export function getServers(ns: NS) {
    const res = [];
    const numOfTargets = ns.read("targets.txt").length;
    const servers = ns.getPurchasedServers();
    for (const each of servers){
        const totalRam = ns.getServerMaxRam(each);

        const numOfThreadsPerTarget = getNumOfThreadsPerTarget(ns, each, numOfTargets, "server-hack.js");
        const newServer = new Server(each,totalRam,numOfThreadsPerTarget);
        res.push(newServer);
    }
    return res;
}