import { NS } from "@ns";

import * as h from "hackutility.js";
import { getServers } from "serverutility.js";

export async function main(ns: NS) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await ns.run("buyservers.js", 1);
    await ns.sleep(15000);
    if (ns.scriptRunning("buyservers.js", "home")) {
      await ns.sleep(50000);
    }
    await doLoop(ns);
  }
  async function doLoop(ns: NS) {
    const targets = ns.read("targets.txt").split(",");
    const myServers = getServers(ns);
    //check that servers are hacking targets
    for (const each of myServers) {
      for (const target of targets) {
        if (ns.isRunning("server-hack.js", each.name, target)) {
          continue;
        }
        else{
          ns.scp("server-hack.js", each.name);
          ns.print("Target is " + target);
          each.threadsPerTarget = h.getNumOfThreadsPerTarget(ns,each.name, targets.length, "server-hack.js");
          await h.runHack(
            ns,
            "server-hack.js",
            each.name,
            each.threadsPerTarget,
            target
          );
        }
        
      }
    }
  }
}
