
import { AccItems } from './items/accessories';
import { ArmorItems } from './items/armor';
import { CombatItems } from './items/combatitems';
import { CardItems } from './items/cards';
import { HalloweenItems } from './items/halloween';
import { QuestItems } from './items/quest';
import { StrapOnItems } from './items/strapon';
import { ToysItems } from './items/toys';
import { WeaponsItems } from './items/weapons';
import { IngredientItems } from './items/ingredients';
import { AlchemyItems } from './items/alchemy';
import { AlchemySpecial } from './items/alchemyspecial';

// Namespace that item prototypes are kept in
let Items = {
    Accessories : AccItems,
    Armor : ArmorItems,
    Combat : CombatItems,
    Cards : CardItems,
    Quest : QuestItems,
    StrapOn : StrapOnItems,
    Toys : ToysItems,
    Weapons : WeaponsItems,

    Ingredients : IngredientItems,
    Alchemy : AlchemyItems,
    AlchemySp : AlchemySpecial,

    Halloween : HalloweenItems,
};

export { Items };
