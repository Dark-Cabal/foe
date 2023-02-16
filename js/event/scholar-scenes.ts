import {Player} from "./player";
import {GAME, MoveToLocation, WORLD} from "../GAME";
import {Burrows} from "../loc/burrows";
import {IParse, Text} from "../text";
import {Scholar} from "./scholar";
import {ScholarFlags} from "./scholar-flags";
import {BurrowsFlags} from "../loc/burrows-flags";
import {IChoice} from "../link";
import {Gui} from "../gui";


export namespace ScholarScenes {

    export function StudyApproach() {
        const player: Player = GAME().player;
        const scholar: Scholar = GAME().scholar;

        const cost   = scholar.Cost();
        const p1cock = player.BiggestCock();

        let parse: IParse = {
            cost: Text.NumToText(cost),
        };
        parse = player.ParserTags(parse);
        parse = Text.ParserPlural(parse, player.NumCocks() > 1);

        Text.Clear();
        Text.Out("As you make your way towards the table when he does not seem threatening, just surprised, you’re able to get a better look at the elf. He’s a dainty little thing, as elves are wont to be; petitely built, but feminine, and clad in mages robes with a compelling choker around his throat. His long, peach-colored hair is plaited into two braids framing his pretty face with the deepest brown eyes behind delicate glasses.");
        Text.NL();
        Text.Add("Drawing closer, he clears his throat and looks at you with something akin to polite interest.");
        Text.NL();
        parse.fem = player.mfFem("mister", "ma’am");
        Text.Add("<i>“Hail, [fem]. May I inquire as to what brings you to my humble abode, traveller?”</i> he asks with a shy smile.");
        Text.NL();
        if (scholar.flags.Met.NotMet) {
            Text.Add("You can’t help but note that despite the shyness of his smile, and the timid tone of his voice, those brown eyes are fixated on you, open wide so he can practically drink in every part of you. There is something there that is not just apprehension. Smiling politely, you tell him you just stumbled upon his cave by chance looking for shelter, and ask him who he is.", parse);
            Text.NL();
            Text.Add("<i>“My name is of no consequence. I am a scholar, searching for the truths of the world. Unfortunately, I need space, quiet and concentration for my pursuit, so a while back I decided to leave my home town and make a home here. I’m still adjusting, but I’ll try my best to fulfill my need for knowledge and share it with stumbling travellers like you,”</i> he smiles again.", parse);
            Text.NL();
            Text.Add("He certainly has the attitude right; he genuinely sounds enthusiastic about it.", parse);
            Text.NL();
            Text.Add("A scholar. How peculiar to come across one so far away from any city or walled off settlement.", parse);
            Text.NL();
            Text.Add("He coughs a little at your hum. <i>“I, um, I just so happen to like teaching. Is there something wrong with that?”</i> There is not, but something strikes you as missing in that explanation. Maybe he will open up to you sometime.", parse);

            scholar.flags.Met = ScholarFlags.Met.Met;
        }
        TalkPrompt();
    }

    export function TalkPrompt () {
        const player: Player = GAME().player;
        const scholar: Scholar = GAME().scholar;


        const options: IChoice[] = [
            {nameStr: "Talk",
                func() {
                    Text.Clear();
                    if (scholar.Relation() < 0) {
                        Text.Add("<i>“Can I help you with something?”</i> he responds shortly. He does not seem to like you butting into his reading time.");
                    } else if (scholar.Relation() < 50) {
                        Text.Add("<i>“And what would you ask?”</i> the scholar prompts, a bored expression on his face. He does, however, lift his gaze from his tome to inspect you briefly.");
                    } else {
                        Text.Add("<i>“And what troubles you?”</i> the scholar queries with a fond smile.");
                    }
                    Text.Flush();

                    ScholarScenes.TalkPrompt();
                }, enabled: true,
                tooltip: "There’s something you want to ask the mysterious inhabitant.",
            },
            {
                nameStr : "Back out",
                func : () => {
                    Text.Clear();
                    Text.Out(`You shake your head, apologize and make to leave the cave.

					“Thought as much…” the scholar says, nonetheless managing to look disappointed. “If you change your mind… well, you know where to find me.” He gives you a smile as you leave his homestead.`);
                    Text.Flush();

                    Gui.NextPrompt(() => {
                        MoveToLocation(WORLD().loc.Plains.Crossroads, {minute: 60});
                    })

                }, enabled : true,
                tooltip : "Come to think of it, you have other places to be.",
            },
        ];
        Gui.SetButtonsFromList(options);
    }
}

