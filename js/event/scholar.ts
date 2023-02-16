/*
 *
 * Define Scholar
 *
 */

import { Images } from "../assets";
import { Color } from "../body/color";
import { Race } from "../body/race";
import { Entity } from "../entity";
import { GAME, NAV, TimeStep, WORLD, WorldTime } from "../GAME";
import { Gui } from "../gui";
import { IStorage } from "../istorage";
import { ArmorItems } from "../items/armor";
import { WeaponsItems } from "../items/weapons";
import { JobDesc, Jobs } from "../job";
import { IChoice } from "../link";
import { ILocation } from "../location";
import { Party } from "../party";
import { Text } from "../text";
import { ITime, Time } from "../time";
import {ScholarFlags} from "./scholar-flags";
//import { RoaFlags } from "./roa-flags";


export class Scholar extends Entity {
    constructor(storage?: IStorage) {
        super();

        this.ID = "scholar";

        // Character stats
        this.name = "Scholar";

        this.avatar.combat = Images.scholar;

        this.currentJob = Jobs.Scholar;
        this.jobs.Scholar   = new JobDesc(Jobs.Scholar);
        this.jobs.Scholar.level = 3;

        this.maxHp.base        = 100;
        this.maxSp.base        = 40;
        this.maxLust.base      = 80; this.maxLust.growth      = 6;
        // Main stats
        this.strength.base     = 11; this.strength.growth     = 1;
        this.stamina.base      = 19; this.stamina.growth      = 1.4;
        this.dexterity.base    = 19; this.dexterity.growth    = 1.1;
        this.intelligence.base = 12; this.intelligence.growth = 1.3;
        this.spirit.base       = 23; this.spirit.growth       = 1.8;
        this.libido.base       = 24; this.libido.growth       = 1.2;
        this.charisma.base     = 14; this.charisma.growth     = 1.4;

        this.level = 8;
        this.sexlevel = 1;
        this.SetExpToLevel();

        this.body.DefMale();
        this.FirstBreastRow().size.base = 2;
        this.Butt().buttSize.base = 3;
        this.Butt().virgin = true;
        this.body.SetRace(Race.Elf);
        this.body.SetBodyColor(Color.light);
        this.body.SetEyeColor(Color.brown);
        this.body.SetHairColor(Color.pink);

        this.weaponSlot   = WeaponsItems.AmberStaff;
        this.topArmorSlot = ArmorItems.MageRobes;

        this.Equip();
        this.SetLevelBonus();
        this.RestFull();

    //  defaulting to not met yet
        this.flags.Met      = ScholarFlags.Met.NotMet;

        if (storage) { this.FromStorage(storage); }
    }

    // TODO
    public Cost() {
        return 100;
    }

    public Met() {
        return this.flags.Met >= ScholarFlags.Met.Met;
    }

    public Recruited() {
        return false;
    }

    public FromStorage(storage: IStorage) {
        this.LoadPersonalityStats(storage);

        // Load flags
        this.LoadFlags(storage);
        this.LoadSexFlags(storage);
    }

    public ToStorage() {
        const storage: IStorage = {};

        this.SavePersonalityStats(storage);

        this.SaveFlags(storage);
        this.SaveSexFlags(storage);

        return storage;
    }

    // Schedule //TODO
    public IsAtLocation(location?: ILocation) {
        return true;
    }

    // Party interaction //TODO

}
