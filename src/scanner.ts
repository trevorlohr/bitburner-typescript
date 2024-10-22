import { NS } from "@ns";

export async function main(ns: NS) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await ns.run("deepscan.js", 1);
        await ns.sleep(10000);
    }
}