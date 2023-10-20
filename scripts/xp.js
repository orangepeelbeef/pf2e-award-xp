"use strict";

Hooks.once("init", function() {
    console.log("Initialized pf2e-award-xp")
});

Hooks.on("renderPartySheetPF2e", async (party_sheet, html, data) => {
    if (!game.user.isGM)
        return
    const awardButton = $(`<label for="pf2e-award-xp-value">XP:<input type="text" id="pf2e-award-xp-value" name="pf2e-award-xp-value"><button id="grant-xp-button">Grant XP</button>`)
    html.find("div.content").append((awardButton))
    $("#grant-xp-button").click((event) => {award_xp(html)})
    }
);

function award_xp(html) {
    html = html[0]
    const xp_to_award = parseInt(html.querySelector("#pf2e-award-xp-value").value)
    const party_members = game.actors.party.members
    party_members.forEach(pc => {
        const new_xp = parseInt(pc.system.details.xp.value) + parseInt(xp_to_award)
        pc.update({"system.details.xp.value": new_xp});
    })
}
