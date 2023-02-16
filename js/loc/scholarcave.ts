/*
 *
 * Study Cave area
 *
 */

import { EncounterTable } from "../encountertable";
import { Event } from "../event";
import { GAME, MoveToLocation, TimeStep, WORLD } from "../GAME";
import { Gui } from "../gui";
import { QuestItems } from "../items/quest";
import { Link } from "../link";
import { Party } from "../party";
import { Text } from "../text";
import { Burrows } from "./burrows";
import { BurrowsFlags } from "./burrows-flags";
import { ILocSC } from "../location";
import { Scholar } from "../event/scholar";
import {ScholarScenes} from "../event/scholar-scenes";
import {Isla} from "../event/highlands/isla";



// Create namespace
const ScholarCaveLoc: ILocSC = {
    Entrance         : new Event("Entrance"),
    ScholarStudy            : new Event("ScholarStudy"),
};

//
// Shore
//
ScholarCaveLoc.Entrance.description = () => {
    Text.Out(`You are standing in the generous mouth of a cave half-hidden beneath lush foilage. The terrain here is much more forest-y than the plains, a cross between them in a way. The cave walls look not as much as if they had been hewn by human hands and more like the passageway had eroded through the stone, the amount of moss and mushrooms growing on the sides testament to that.`);
};

ScholarCaveLoc.Entrance.links.push(new Link(
    "Deeper Inside", true, true,
    () => {
        Text.NL();
        Text.Add("In front you can see a winding, worn corridor deeper into the cave.");
    },
    () => {
        MoveToLocation(WORLD().loc.ScholarCave.ScholarStudy, {minute: 15});
    },
));

ScholarCaveLoc.Entrance.links.push(new Link(
    "Plains", true, true,
    () => {
        Text.NL();
        Text.Add("Behind you is the way back to the plains.<br>");
    },
    () => {
        MoveToLocation(WORLD().loc.Plains.Crossroads, {minute: 45});
    },
));

ScholarCaveLoc.ScholarStudy.description = () => {
    Text.Out(`The corridor spits you out into what looks like a natural cave in a rough ball form. Every wall has been packed with bookcases to hold hundreds upon hundreds of books, parchment rolls and loose papers. A few just as massive oak tables are strewn about the wooden floorboards on the cave floor, all of them littered with open tomes, stacks of parchment, inkwells, quills and the occasional glass lantern that keep the cave lit.`);
    Text.Out(`To your surprise, you realize that the slightly damp air of the winding path behind you does not follow you here, instead you are blanketed in warmth and dryness.`);
    Text.NL();
    Text.Out(`On the far side, you can see a massive poster-less double bed with silken sheets and warm furs to keep out the cold. However, at the noise you make in wonder at your entrance, the sole inhabitant of the study-cave looks up from his spot on a chair in front of the most centered table.`)
};

ScholarCaveLoc.Entrance.enc = new EncounterTable();

ScholarCaveLoc.ScholarStudy.enc = new EncounterTable();

ScholarCaveLoc.ScholarStudy.events.push(new Link(
    () => {
        const scholar: Scholar = GAME().scholar;
        return scholar.Met() ? "The Scholar" : "Elf";
    }, true, true,
    () => {
        const scholar: Scholar = GAME().scholar;
        if (scholar.Met()) {
            Text.NL();
            Text.Add("The elven scholar is in his usual spot, clad in his mage robes. His eyes flit over the pages of a book with unwavering interest.");
        } else {
            Text.NL();
            Text.Add("A petitely built feminine elf sits over at one of the tables.");
        }
        Text.NL();
    },
    () => {
        ScholarScenes.StudyApproach();
    },

))

export { ScholarCaveLoc };
