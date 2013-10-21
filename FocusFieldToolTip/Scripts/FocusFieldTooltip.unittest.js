$(function () {
    var textInput1 = $("#textInput1"), form = $("form");

    $.fx.off = true;

    QUnit.testStart = function () {
        console.log("testStart");
        $(":richw-focusFieldTooltip").each(function () { $(this).focusFieldTooltip("destroy"); });
        console.log("tooltips: " + $(":richw-focusFieldTooltip").length);
    };

    test("Tooltip shows when field is focused and hides when field is blurred", function () {
        expect(15);
        $("input, select, button", form).each(function () {
            testFieldFocus($(this));
        });
    });

    test("When the tooltip for textInput1 is destroyed, it doesn't display when textInput1 is focused", function () {
        expect(1);
        textInput1.focusFieldTooltip({
            content: "Tooltip Text"
        });

        textInput1.focusFieldTooltip("destroy");

        textInput1.focus();
        ok(!$("#textInput1_focusfieldtooltip").is(":visible"), "tooltip is not visible");
    });

    function testFieldFocus(field) {
        field.focusFieldTooltip({
            content: "Tooltip Text"
        });

        field.focus();
        ok($("#" + field.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is visible when field focused " + field.attr("id"));
        ok($(".focusFieldTooltip:visible").not($("#" + field.focusFieldTooltip("toolTipId"))).length === 0, "no other tooltips are visible ");

        $("input, button, select, radio").not(field).focus();
        ok(!$("#" + field.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is not visible when field not focused " + field.attr("id"));
    }

    test("when textInput1's one content is changed, the content is displayed", function () {
        expect(3);
        textInput1.focusFieldTooltip({
            content: "Tooltip Text"
        });

        textInput1.focus();
        ok($("#textInput1_focusfieldtooltip").is(":visible"), "tooltip is visible");
        ok($("#textInput1_focusfieldtooltip").text() === "Tooltip Text", "Text is set properly before change");

        textInput1.focusFieldTooltip("option", "content", "new content");

        ok($("#textInput1_focusfieldtooltip").text() === "new content", "Text is set properly after change");
    });

    test("when textInput1 is not focused and showToolTip is called, the tooltip is shown", function () {
        textInput1.focusFieldTooltip({
            content: "Tooltip Text"
        });

        ok($(".focusFieldTooltip:visible").not($("#" + textInput1.focusFieldTooltip("toolTipId"))).length === 0, "no other tooltips are visible ");
        $("input, button, select, radio").not(textInput1).focus();

        textInput1.focusFieldTooltip("showToolTip");
        ok($("#" + textInput1.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is visible");

        textInput1.focusFieldTooltip("hideToolTip");
        ok(!$("#" + textInput1.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is not visible");

    });

    test("when hideAllTooltips is called, no tooltips are visibile", function () {
        textInput1.focusFieldTooltip({
            content: "Tooltip Text"
        });

        textInput1.focus();
        
        textInput1.focusFieldTooltip("showToolTip");
        ok($("#" + textInput1.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is visible");

        textInput1.focusFieldTooltip("hideAllToolTips");
        ok(!$("#" + textInput1.focusFieldTooltip("toolTipId")).is(":visible"), "tooltip is not visible");

    });
});