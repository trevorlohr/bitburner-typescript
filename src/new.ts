import { NS } from "@ns";

import { runHack } from "hackutility.js";

export async function main(ns: NS) {
    await ns.run("scanner.js", 1);
    await ns.sleep(8000);
    const homeRamInfo = ns.getServerMaxRam("home");
    const totalRam = homeRamInfo;
    const usedRam = ns.getServerUsedRam("home")
    const targets = ns.read("targets.txt").split(",");
    const ramLeft = totalRam - usedRam;
    const threads = Math.floor(
        Math.floor((ramLeft * 0.6) / targets.length) /
        ns.getScriptRam("node-hack.js", "home")
    );
    for (const target of targets) {
        ns.tprint(target);
        await runHack(ns, "node-hack.js", "home", threads, target);
        await ns.sleep(2000);
    }
}
