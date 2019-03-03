/*
* Restrictions:
*    C    Carepackage only
*    E    Map: Erangel
*    M    Map: Miramar
*    S    Map: Sanhok
* 
* Firemodes:
*    S    Semi-auto / Single shot bolt action
*    B    Burst
*    A    Full-auto
*    N    None / Not applicable
*/

/* Firemode lock:
* S = weapons that have ONLY semi auto / single shot
* B = weapons that feature burst fire mode
* A = weapons that feature full auto fire
*/

var isMapSelected = false;

function mapSelectErangel()
{
    if (!isMapSelected)
    {
        var divMiramarImageMap = document.getElementById("mapDivMiramar");
        var divSanhokImageMap = document.getElementById("mapDivSanhok");
        var divVikendiImageMap = document.getElementById("mapDivVikendi");

        isMapSelected = true;
        divMiramarImageMap.classList.add("uk-animation-scale-down");
        divMiramarImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divMiramarImageMap.style.display = "none"; }, 500);
        divSanhokImageMap.classList.add("uk-animation-scale-down");
        divSanhokImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divSanhokImageMap.style.display = "none"; }, 500);
        divVikendiImageMap.classList.add("uk-animation-scale-down");
        divVikendiImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divVikendiImageMap.style.display = "none"; }, 500);
        paintRandomLocation("erangel");
        lastMap = "erangel";
        rollWeapons("E");
    }
}

function mapSelectMiramar()
{
    if (!isMapSelected)
    {
        var divErangelImageMap = document.getElementById("mapDivErangel");
        var divSanhokImageMap = document.getElementById("mapDivSanhok");
        var divVikendiImageMap = document.getElementById("mapDivVikendi");

        isMapSelected = true;
        divErangelImageMap.classList.add("uk-animation-scale-down");
        divErangelImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divErangelImageMap.style.display = "none"; }, 500);
        divSanhokImageMap.classList.add("uk-animation-scale-down");
        divSanhokImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divSanhokImageMap.style.display = "none"; }, 500);
        divVikendiImageMap.classList.add("uk-animation-scale-down");
        divVikendiImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divVikendiImageMap.style.display = "none"; }, 500);
        paintRandomLocation("miramar");
        lastMap = "miramar";
        rollWeapons("M");
    }
}

function mapSelectSanhok()
{
    if (!isMapSelected)
    {
        var divErangelImageMap = document.getElementById("mapDivErangel");
        var divMiramarImageMap = document.getElementById("mapDivMiramar");
        var divVikendiImageMap = document.getElementById("mapDivVikendi");

        isMapSelected = true;
        divErangelImageMap.classList.add("uk-animation-scale-down");
        divErangelImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divErangelImageMap.style.display = "none"; }, 500);
        divMiramarImageMap.classList.add("uk-animation-scale-down");
        divMiramarImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divMiramarImageMap.style.display = "none"; }, 500);
        divVikendiImageMap.classList.add("uk-animation-scale-down");
        divVikendiImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divVikendiImageMap.style.display = "none"; }, 500);
        paintRandomLocation("sanhok");
        lastMap = "sanhok";
        rollWeapons("S");
    }
}

function mapSelectVikendi()
{
    if (!isMapSelected)
    {
        var divErangelImageMap = document.getElementById("mapDivErangel");
        var divMiramarImageMap = document.getElementById("mapDivMiramar");
        var divSanhokImageMap = document.getElementById("mapDivSanhok");

        isMapSelected = true;
        divErangelImageMap.classList.add("uk-animation-scale-down");
        divErangelImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divErangelImageMap.style.display = "none"; }, 500);
        divMiramarImageMap.classList.add("uk-animation-scale-down");
        divMiramarImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divMiramarImageMap.style.display = "none"; }, 500);
        divSanhokImageMap.classList.add("uk-animation-scale-down");
        divSanhokImageMap.classList.add("uk-animation-reverse");
        setTimeout(function(){ divSanhokImageMap.style.display = "none"; }, 500);
        paintRandomLocation("vikendi");
        lastMap = "vikendi";
        rollWeapons("V");
    }
}

function reroll()
{
    console.log("85");
    if (lastMap == null)
    {
        return;
    }
    rollWeapons(lastMap.substring(0, 1).toUpperCase());
    var canvas = document.getElementById("cvs_" + lastMap);
    fillCanvas(canvas, "assets/img_" + lastMap + ".png", true);
}

var lastMap = null;

// array.map()    => LINQ.Select()
// array.filter() => LINQ.Where()
// array.every()  => LINQ.All()
// array.some()   => LINQ.Any()
// array.reduce() ~= LINQ.Aggregate()
// array.sort()   ~= LINQ.OrderBy() sorts arrays in place :/

function rollWeapon(array, exclude, ammoType)
{
    //var rbNormalMode = document.getElementById("rbNormalMode");
    var rbSingleAmmoMode = document.getElementById("rbSingleAmmoMode");
    //var rbFiremodeMode = document.getElementById("rbFiremodeMode");

    var cbHardrollCarepackages = document.getElementById("cbHardrollCarepackages");

    var cbSpecificWeapontype = document.getElementById("cbSpecificWeapontype");
    var weaponTypeSelector = document.getElementById("weaponTypeSelector");

    //var fireMode = getRandomValue(fireModes);

    var filteredArray = array.filter(function(x)
    {
        console.log("filtering " + x.name);
        if (x.name === exclude)
        {
            return false;
        }
        if (!cbHardrollCarepackages.checked && x.restrictions.includes("C"))
        {
            return false;
        }
        //if (rbFiremodeMode.checked && array != sidearms && !x.restrictions.includes(fireMode))
        //{
        //    return false;
        //}
        if (rbSingleAmmoMode.checked && x.ammo !== ammoType)
        {
            return false;
        }
        if (cbSpecificWeapontype.checked && x.type !== weaponTypeSelector.value && (array !== sidearms || weaponTypeSelector.value === "shotgun"))
        {
            return false;
        }
        return true;
    });

    var result = getRandomValue(filteredArray);

    return result;
}

function getRandomValue(array)
{
    return array[Math.floor(Math.random() * array.length)];
}

function rollWeapons(map)
{
    var mainWeapons = Enumerable.from(ar.concat(dmr).concat(smg).concat(sr).concat(lmg).concat(shotgun)).where(function (x) { return (/*!x.restrictions.includes("C") && */x.restrictions.includes(map)); }).toArray();

    var cbRollBonusRule = document.getElementById("cbRollBonusRule");
    if (cbRollBonusRule.checked)
    {
        var bonusRule = bonusRules[Math.floor(Math.random() * bonusRules.length)];
        var bonusRulesDiv = document.getElementById("bonusRulesDiv");
        var bonusRuleName = document.getElementById("bonusRuleName");
        var bonusRuleText = document.getElementById("bonusRuleText");
        bonusRulesDiv.style.display = "";
        bonusRuleName.innerText = bonusRule.name;
        bonusRuleText.innerText = bonusRule.text;
    }

    var ammoType = getRandomValue(allWeaponAmmoKeys);

    var primary = rollWeapon(mainWeapons, null, ammoType);
    var secondary = rollWeapon(mainWeapons, primary.name, ammoType);
    var sidearm = rollWeapon(sidearms, null, ammoType);

    const imgWidth = 120;
    const imgHeight = 120;

    var btnReroll = document.getElementById("btnReroll");
    btnReroll.style.display = "";

    var settingsContainer = document.getElementById("settingsContainer");
    settingsContainer.style.display = "none";

    var weaponCardContainer = document.getElementById("weaponCardContainer");
    weaponCardContainer.style.display = "";

    var weaponSlot1 = document.getElementById("weaponSlot1");
    var weaponSlot2 = document.getElementById("weaponSlot2");
    var weaponSlot3 = document.getElementById("weaponSlot3");

    var weaponNameTag1 = document.getElementById("weaponNameTag1");
    var weaponNameTag2 = document.getElementById("weaponNameTag2");
    var weaponNameTag3 = document.getElementById("weaponNameTag3");

    var imgWeapon1 = document.createElement("img");
    var imgWeapon2 = document.createElement("img");
    var imgWeapon3 = document.createElement("img");

    imgWeapon1.width = imgWidth;
    imgWeapon1.height = imgHeight;
    imgWeapon1.src = primary.sprite;
    weaponSlot1.innerHTML = "";
    weaponSlot1.appendChild(imgWeapon1);
    weaponNameTag1.innerText = primary.name;

    imgWeapon2.width = imgWidth;
    imgWeapon2.height = imgHeight;
    imgWeapon2.src = secondary.sprite;
    weaponSlot2.innerHTML = "";
    weaponSlot2.appendChild(imgWeapon2);
    weaponNameTag2.innerText = secondary.name;

    imgWeapon3.width = imgWidth;
    imgWeapon3.height = imgHeight;
    imgWeapon3.src = sidearm.sprite;
    weaponSlot3.innerHTML = "";
    weaponSlot3.appendChild(imgWeapon3);
    weaponNameTag3.innerText = sidearm.name;
}

function initialize()
{
    var divErangelImageMap = document.getElementById("mapDivErangel");
    var divMiramarImageMap = document.getElementById("mapDivMiramar");
    var divSanhokImageMap = document.getElementById("mapDivSanhok");
    var divVikendiImageMap = document.getElementById("mapDivVikendi");

    populateDiv(divErangelImageMap, maps[0].image, "erangel");
    populateDiv(divMiramarImageMap, maps[1].image, "miramar");
    populateDiv(divSanhokImageMap, maps[2].image, "sanhok");
    populateDiv(divVikendiImageMap, maps[3].image, "vikendi");

    var weaponCardContainer = document.getElementById("weaponCardContainer");
    weaponCardContainer.style.display = "none";

    var divErangelLocMap = document.createElement("div");
    divErangelLocMap.style.display = "none";

    var divMiramarLocMap = document.createElement("div");
    divMiramarLocMap.style.display = "none";

    var divSanhokLocMap = document.createElement("div");
    divSanhokLocMap.style.display = "none";

    var divVikendiLocMap = document.createElement("div");
    divVikendiLocMap.style.display = "none";

    divErangelImageMap.appendChild(divErangelLocMap);
    divMiramarImageMap.appendChild(divMiramarLocMap);
    divSanhokImageMap.appendChild(divSanhokLocMap);
    divVikendiImageMap.appendChild(divVikendiLocMap);

    populateDiv(divErangelLocMap, maps[0].locationmap, "loc_erangel");
    populateDiv(divMiramarLocMap, maps[1].locationmap, "loc_miramar");
    populateDiv(divSanhokLocMap, maps[2].locationmap, "loc_sanhok");
    populateDiv(divVikendiLocMap, maps[3].locationmap, "loc_vikendi");
}

const mapImgWidth = 360;
const mapImgHeight = 360;

function populateDiv(div, image, name)
{   
    var canvas = document.createElement("canvas");
    div.appendChild(canvas);
    div.width = mapImgWidth;
    div.height = mapImgHeight;
    canvas.id = "cvs_" + name;
    canvas.width = mapImgWidth;
    canvas.height = mapImgHeight;
    fillCanvas(canvas, image, false);
    return canvas;
}

function fillCanvas(canvas, image, markLocation)
{
    var context = canvas.getContext("2d");
    var img = new Image();
    img.onload = function()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, mapImgWidth, mapImgHeight);
        if (markLocation)
        {
            paintRandomLocation(lastMap);
        }
    }
    img.src = image;
}

function paintRandomLocation(map)
{
    var success = false;

    var imgCanvas = document.getElementById("cvs_" + map);
    var mapCanvas = document.getElementById("cvs_loc_" + map);

    var x, y;

    while (success === false)
    {
        x = Math.random() * mapImgWidth;
        y = Math.random() * mapImgHeight;

        var sample = sampleImageFromCanvas(x, y, mapCanvas);

        if (sample[0] == 255)
        {
            success = true;
        }
    }

    var drawContext = imgCanvas.getContext("2d");

    drawContext.beginPath();
    drawContext.arc(x,y,10,0,2 * Math.PI);
    drawContext.strokeStyle = "#FF0000";
    drawContext.lineWidth = 3;
    drawContext.stroke();


    console.log("(" + x + "|" + y + ")");
}

function sampleImageFromCanvas(x, y, canvas)
{
    return canvas.getContext("2d").getImageData(x, y, 1, 1).data;
}

function sampleImageFromFile(x, y, image)
{
    var img = document.createElement('img');
    img.src = image;
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    return canvas.getContext('2d').getImageData(x, y, 1, 1).data;
}

var maps = 
[
    { name: "Erangel", size: "8km", image: "assets/img_erangel.png", locationmap: "assets/locmap_erangel.png" },
    { name: "Miramar", size: "8km", image: "assets/img_miramar.png", locationmap: "assets/locmap_miramar.png" },
    { name: "Sanhok",  size: "4km", image: "assets/img_sanhok.png",  locationmap: "assets/locmap_sanhok.png" },
    { name: "Vikendi", size: "6km", image: "assets/img_vikendi.png", locationmap: "assets/locmap_vikendi.png" }
];

var bonusRules = 
[
    { name: "Rest in Peace", text: "You are not allowed to loot bodies. You must collect all your loot from the ground."},
    { name: "Grave Robbery", text: "After leaving your landing area you may only pick up loot from dead bodies."},
    { name: "Vanilla",       text: "You aren't allowed to put any mods on your weapons."},
    { name: "The white death", text: "You can't use scopes or sights besides the weapons iron sights."},
    { name: "Size doesn't matter", text: "You can't use extended magazines on your weapons."},
    { name: "Daytrip", text: "You can only use the tier 1 backpack."},
    { name: "All the small things", text: "You can only use tier 1 helmet, vest and backpack."},
    { name: "Han shot first", text: "You can only shoot after the enemy shoots first."},
    { name: "Greedo shot first", text: "You can only shoot after the enemy shoots first."},
    { name: "Crate Hunter", text: "You must chase every crate you see."},
    { name: "Beware the walkers", text: "Always carry a molotov and use it to burn an enemies corpse after you kill them."},
    { name: "Making sure", text: "After you killed a squad shoot every corpse in the head with your pistol."},
    { name: "Ninja Mode", text: "You can only shoot with silenced weapons and may not use grenades."},
    { name: "Shellshock", text: "You can't move with a red zone nearby."},
    { name: "Lone Rider", text: "You aren't allowed to exchange items with your teammates."}
]

var Maps = 
{
    Erangel: maps[0],
    Miramar: maps[1],
    Sanhok: maps[2],
    Vikendi: maps[3],
}

var ammoKeys = 
[
    "9",
    "45",
    "556",
    "762",
    "12g",
    "300",
    "bolt"
];

var allWeaponAmmoKeys = 
[
    "9",
    "45",
    "12g"
];

var fireModes = 
[
    "S", // Semi/Singleaction
    "A", // (Full) Auto
    "B"  // Burst
];

var primaryWeaponTypes = 
[
    "ar",
    "dmr",
    "sr",
    "smg",
    "shotgun"
    /*"lmg" excluded because there is only 1 non-carepackage LMG */
];

var weaponTypes = 
[
    "ar",
    "dmr",
    "sr",
    "smg",
    "shotgun",
    "lmg",
    "pistol"
];

var ar = 
[
    { name: "AKM",         firemodes: "SA",  restrictions: "SMEV",  ammo: "762", type: "ar", sprite: "assets/gun_ar_akm.png" },
    { name: "M416",        firemodes: "SA",  restrictions: "SMEV",  ammo: "556", type: "ar", sprite: "assets/gun_ar_m416.png" },
    { name: "M16A4",       firemodes: "SB",  restrictions: "SMEV",  ammo: "556", type: "ar", sprite: "assets/gun_ar_m16.png" },
    { name: "SCAR-L",      firemodes: "SA",  restrictions: "ME",    ammo: "556", type: "ar", sprite: "assets/gun_ar_scar.png" },
    { name: "Groza",       firemodes: "SA",  restrictions: "SMECV", ammo: "762", type: "ar", sprite: "assets/gun_ar_groza.png" },
    { name: "AUG A3",      firemodes: "SA",  restrictions: "SMECV", ammo: "556", type: "ar", sprite: "assets/gun_ar_aug.png" },
    { name: "QBZ95",       firemodes: "SA",  restrictions: "S",     ammo: "556", type: "ar", sprite: "assets/gun_ar_qbz.png" },
    { name: "Beryl M762",  firemodes: "SBA", restrictions: "SMEV",  ammo: "762", type: "ar", sprite: "assets/gun_ar_beryl.png" },
    { name: "Mk47 Mutant", firemodes: "SB",  restrictions: "SMEV",  ammo: "762", type: "ar", sprite: "assets/gun_ar_mutant.png" },
    { name: "G36C",        firemodes: "SA",  restrictions: "SMEV",  ammo: "556", type: "ar", sprite: "assets/gun_ar_g36c.png" }
];

var dmr = 
[
    { name: "SKS",       firemodes: "S",  restrictions: "SMEV",  ammo: "762", type: "dmr", sprite: "assets/gun_dmr_sks.png" },
    { name: "Mk14 EBR",  firemodes: "SA", restrictions: "SMECV", ammo: "762", type: "dmr", sprite: "assets/gun_dmr_mk14.png" },
    { name: "Mini 14",   firemodes: "S",  restrictions: "MEV",   ammo: "556", type: "dmr", sprite: "assets/gun_dmr_mini.png" },
    { name: "SLR",       firemodes: "S",  restrictions: "SMEV",  ammo: "762", type: "dmr", sprite: "assets/gun_dmr_slr.png" },
    { name: "QBU",       firemodes: "S",  restrictions: "S",     ammo: "556", type: "dmr", sprite: "assets/gun_dmr_qbu.png" }
];

var smg = 
[
    { name: "Micro UZI",     firemodes: "SA",  restrictions: "SMEV", ammo: "9",  type: "smg", sprite: "assets/gun_smg_uzi.png" },
    { name: "Tommy Gun",     firemodes: "SA",  restrictions: "SMEV", ammo: "45", type: "smg", sprite: "assets/gun_smg_tommy.png" },
    { name: "UMP-9",         firemodes: "SBA", restrictions: "SMEV", ammo: "9",  type: "smg", sprite: "assets/gun_smg_ump.png" },
    { name: "Kriss Vector",  firemodes: "SBA", restrictions: "SMEV", ammo: "45", type: "smg", sprite: "assets/gun_smg_vector.png" }
];

var sr = 
[
    { name: "AWM",               firemodes: "S",  restrictions: "SMECV", ammo: "300", type: "sr", sprite: "assets/gun_sr_awm.png" },
    { name: "Karabiner 98 Kurz", firemodes: "S",  restrictions: "SMEV",  ammo: "762", type: "sr", sprite: "assets/gun_sr_kar.png" },
    { name: "M24",               firemodes: "S",  restrictions: "SMEV",  ammo: "762", type: "sr", sprite: "assets/gun_sr_m24.png" },
    { name: "VSS",               firemodes: "SA", restrictions: "SMEV",  ammo: "9",   type: "sr", sprite: "assets/gun_sr_vss.png" }
];

var lmg = 
[
    { name: "M249",   firemodes: "A", restrictions: "SMECV", ammo: "556", type: "lmg", sprite: "assets/gun_lmg_m249.png" },
    { name: "DP-28",  firemodes: "A", restrictions: "SMEV",  ammo: "762", type: "lmg", sprite: "assets/gun_lmg_dp28.png" }
];

var shotgun = 
[
    { name: "S12K",   firemodes: "SA", restrictions: "SMEV", ammo: "12g", type: "shotgun", sprite: "assets/gun_sg_s12k.png" },
    { name: "S1897",  firemodes: "S",  restrictions: "SMEV", ammo: "12g", type: "shotgun", sprite: "assets/gun_sg_s1897.png" },
    { name: "S686",   firemodes: "S",  restrictions: "SMEV", ammo: "12g", type: "shotgun", sprite: "assets/gun_sg_s686.png" }
];

var special = 
[
    { name: "Crossbow", firemodes: "S", restrictions: "SMEV", ammo: "bolt", type: "special", sprite: "assets/weap_spec_crossbow.png" }
];

var sidearms =
[
    { name: "P18C",      firemodes: "SA", restrictions: "SMEV", ammo: "9",   type: "pistol",  sprite: "assets/gun_pis_p18.png" },
    { name: "P92",       firemodes: "S",  restrictions: "SMEV", ammo: "9",   type: "pistol",  sprite: "assets/gun_pis_p92.png" },
    { name: "P1911",     firemodes: "S",  restrictions: "SMEV", ammo: "45",  type: "pistol",  sprite: "assets/gun_pis_p1911.png" },
    { name: "R1895",     firemodes: "S",  restrictions: "SMEV", ammo: "762", type: "pistol",  sprite: "assets/gun_pis_r1895.png" },
    { name: "R45",       firemodes: "S",  restrictions: "SMEV", ammo: "45",  type: "pistol",  sprite: "assets/gun_pis_r45.png" },
    { name: "Sawed Off", firemodes: "S",  restrictions: "SMEV", ammo: "12g", type: "shotgun", sprite: "assets/gun_sg_sawedOff.png" },
    { name: "Skorpion",  firemodes: "SA", restrictions: "SMEV", ammo: "9",   type: "pistol",  sprite: "assets/gun_pis_skorpion.png" }
];

var throwable = 
[
    { name: "Frag Grenade",      firemodes: "N", restrictions: "SMEV", type: "throw", sprite: "assets/weap_throw_frag.png" },
    { name: "Molotov Cocktail",  firemodes: "N", restrictions: "SMEV", type: "throw", sprite: "assets/weap_throw_molotov.png" },
    { name: "Smoke Grenade",     firemodes: "N", restrictions: "SMEV", type: "throw", sprite: "assets/weap_throw_smoke.png" },
    { name: "Stun Grenade",      firemodes: "N", restrictions: "SMEV", type: "throw", sprite: "assets/weap_throw_stun.png" }
];

var melee = 
[
    { name: "Crowbar",  firemodes: "N", restrictions: "SMEV", sprite: "assets/weap_melee_crowbar.png" },
    { name: "Machete",  firemodes: "N", restrictions: "SMEV", sprite: "assets/weap_melee_machete.png" },
    { name: "Pan",      firemodes: "N", restrictions: "SMEV", sprite: "assets/weap_melee_pan.png" },
    { name: "Sickle",   firemodes: "N", restrictions: "SMEV", sprite: "assets/weap_melee_sickle.png" }
];

var ammo = 
[
    { name: "9mm",           key: "9",     sprite: "assets/ammo_9mm.png" },
    { name: ".45 ACP",       key: "45",    sprite: "assets/ammo_45acp.png" },
    { name: "5.56mm",        key: "556",   sprite: "assets/ammo_556nato.png" },
    { name: "7.62mm",        key: "762",   sprite: "assets/ammo_762nato.png" },
    { name: "12 Gauge",      key: "12g",   sprite: "assets/ammo_12gauge.png" },
    { name: ".300 Magnum",   key: "300",   sprite: "assets/ammo_300magnum.png" },
    { name: "Crossbow Bolt", key: "bolt",  sprite: "assets/ammo_crossbowbolt.png" }
];

initialize();