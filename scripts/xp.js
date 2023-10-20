"use strict";

Hooks.once("init", function() {
    CONFIG.debug.hooks = true;
    console.log("Initialized pf2e-award-xp")
});

Hooks.on("renderPartySheetPF2e", async (actor_directory, html, data) => {
    if (!game.user.isGM)
        return
    console.log("Attempting to render pf2e-award-xp input box")
    const awardButton = $(`<label for="pf2e-award-xp-value">XP:<input type="text" id="pf2e-award-xp-value" name="pf2e-award-xp-value"><button>Grant XP</button>`)
    html.find(".sheet.party [data-tab=overview] .summary").append((awardButton))
    awardButton.click((event) => {award_xp()})
    }
);

function award_xp() {
    const xp_to_award = parseInt(html.querySelector("#pf2e-award-xp-value").value)
    const party_members = game.actors.party.members
    console.log("Attempting to add XP to party members")
    party_members.forEach(pc => {
        pc.new_xp = pc.xp + xp_to_award
        const update_data = {}
        update_data[xp] = pc.new_xp
        pc.actor.update(update_data)
    })
}

