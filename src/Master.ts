import { NS } from "@ns";

import { nodeReset, serverReset } from "./_masterutility.js";
import { runHack } from "hackutility.js";

export async function main(ns: NS) {
    const reason = ns.args[0];
    const processes = ns.ps("home");
    for (let i = 0; i < processes.length; ++i) {
        if (processes[i].filename !== "Master.js") {
            ns.scriptKill(processes[i].filename, "home")
        }
    }

    if (reason === "xp") {
        const nodes = ns.read("foundnodes.txt").split(",");
        nodeReset(ns);
        serverReset(ns);
        await ns.sleep(10000);
        for (const each of nodes) {
            const ram = ns.getServerMaxRam(each);
            ns.scp("weak.js", each, "home");

            const threads = Math.floor(ram / ns.getScriptRam("weak.js", each));
            await runHack(ns, "weak.js", each, threads, "joesguns");
        }
        const left = ns.getServerMaxRam("home") - ns.getServerUsedRam("home")
        await ns.run("weak.js", (Math.floor(left / ns.getScriptRam("weak.js", "home"))), "joesguns")
        ns.exit();
    }
    await ns.run("scanner.js", 1);
    await ns.sleep(8000);
    const homeRamInfo = ns.getServerMaxRam("home");
    const totalRam = homeRamInfo;



    if (reason === "nodes") {
        ns.tprint("Resetting nodes.");
        nodeReset(ns);
        ns.scriptKill("node-hack.js", "home");
        await ns.run("nodes-process.js", 1);
    }
    if (reason === "servers") {
        ns.tprint("Resetting Servers.");
        serverReset(ns);
        await ns.run("servers-process.js", 1);
    }
    if (reason === "" || reason === undefined || reason === null) {
        ns.tprint("Resetting Servers and nodes.");
        nodeReset(ns);
        serverReset(ns);
        await ns.run("nodes-process.js", 1);
        await ns.run("servers-process.js", 1);
    }
    if (reason === "none") {
        await ns.run("nodes-process.js", 1);
        await ns.run("servers-process.js", 1);
    }
    if (reason === "stock") {
        if (ns.getServerMaxRam("home") - ns.getServerUsedRam("home") > ns.getScriptRam("stockmarket.js", "home")) {
            await ns.run("stockmarket.js", 1);
        }
    }
    const targets = ns.read("targets.txt").split(",");
    const ramLeft = totalRam - ns.getServerUsedRam("home");
    const threads = Math.floor(
        Math.floor((ramLeft * 0.8) / targets.length) /
        ns.getScriptRam("node-hack.js", "home")
    );
    for (const target of targets) {
        await runHack(ns, "node-hack.js", "home", threads, target);
        await ns.sleep(2000);
    }
    // if(ns.getServerMaxRam("home") - ns.getServerUsedRam("home") > ns.getScriptRam("stockmarket.js", "home")){
    //     await ns.run("stockmarket.js", 1);
    // }
}
