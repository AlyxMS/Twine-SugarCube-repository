Macro.add("redraw", {
    "handler": function () {
        //Timer
        const timeData = [];
        const timeStampStart = performance.now();
        let timeStamp = performance.now();
        //Default Settings
        setup.macro_redraw ??= { passageReady: true, passageDone: true, redrawInterface: true, time: false };
        const config = { ...setup.macro_redraw };
        //Config
        const args = this.args.map(e => typeof e === "string" ? e.toLowerCase() : e);
        if (args.includes("passageready")) config.passageReady = args[args.indexOf("passageready") + 1];
        if (args.includes("passagedone")) config.passageDone = args[args.indexOf("passagedone") + 1];
        if (args.includes("interface")) config.redrawInterface = args[args.indexOf("interface") + 1];
        if (args.includes("time")) config.time = args[args.indexOf("time") + 1];
        //Args type check and config keyword check
        if (!Object.values(config).every(e => typeof e === "boolean")) {
            console.error(config);
            return this.error("Settings must be either true or false. See console for current settings.");
        }
        if (args.includes("config")) return setup.macro_redraw = config;
        //Story Interface Detection
        const storyInterface = Story.has("StoryInterface") ? document.querySelectorAll("[data-passage]:not([class*='macro-'],.passage)") : false;
        const storyCaption = Story.has("StoryCaption") ? document.getElementById("story-caption") : false;
        //Run PassageReady
        if (config.passageReady && Story.has("PassageReady")) {
            timeStamp = performance.now();
            jQuery.wiki(Story.get("PassageReady").text);
            logTime("PassageReady", timeStamp);
        }
        //Redraw Main Passage
        timeStamp = performance.now();
        let passageContent = "";
        if (Story.has("PassageHeader")) passageContent += Story.get("PassageHeader").processText();
        passageContent += Story.get(State.passage).processText();
        if (Story.has("PassageFooter")) passageContent += Story.get("PassageFooter").processText();
        jQuery(".passage").empty().wiki(passageContent);
        logTime(State.passage, timeStamp);
        //Run PassageDone
        if (config.passageDone && Story.has("PassageDone")) {
            timeStamp = performance.now();
            jQuery.wiki(Story.get("PassageDone").text);
            logTime("PassageDone", timeStamp);
        }
        //Redraw Interface Passages
        if (config.redrawInterface) {
            if (storyInterface) storyInterface.forEach(e => {
                timeStamp = performance.now();
                const passageName = e.getAttribute("data-passage");
                jQuery(e).empty().wiki(Story.get(passageName).processText());
                logTime(passageName, timeStamp);
            });
            else if (storyCaption) {
                timeStamp = performance.now();
                jQuery(storyCaption).empty().wiki(Story.get("StoryCaption").processText());
                logTime("StoryCaption", timeStamp);
            }
        }
        //Log Time Usage
        if (config.time) {
            console.groupCollapsed(`Redraw on ${State.passage}: ${(performance.now() - timeStampStart).toFixed(2)}ms`);
            timeData.forEach(e => console.log(`${e[0]}: ${e[1]}ms`));
            console.groupEnd();
        }
        //Helper
        function logTime(label, prevStamp) {
            timeData.push([label, (performance.now() - prevStamp).toFixed(2)]);
        }
    }
});
