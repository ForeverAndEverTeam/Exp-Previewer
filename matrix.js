// Validation collections

//Once again, credit to the JN team

//POSE_CODES = []
EYEBROW_CODES = []
BACKARMS_CODES = []
ARMS_CODES = []
ARMS2_CODES = []
//HAIR_CODES = []
EYE_CODES = []
MOUTH_CODES = []
BLUSH_CODES = []
TEAR_CODES = []

// When an option is selected, this forces an update of the corresponding image tag's src to show the correct sprite
function ul(layer) {
    var text = $("#" + layer + "_control :selected").text()
    if (text === "(none)")
    {
        // We use Date here to ensure images aren't cached by spoofing a request for the newest ver.
        $("#" + layer + "_layer").attr("src", "./img/etc/empty.png" + "?" + new Date())
    }
    else
    {
        // We use Date here to ensure images aren't cached by spoofing a request for the newest ver.
        $("#" + layer + "_layer").attr("src", "./img/" + layer + "/" + text + ".png" + "?" + new Date())
    }

    // Update the sprite code displayed to the user
    usc()
}

// This generates the sprite code for the currently selected sprite combination seen by the user
function usc() {
    var code = $("#eyebrows_control :selected").val()
        + $("#backarms_control :selected").val()
        + $("#arms_control :selected").val()
        + $("#arms2_control :selected").val()
        //+ $("#hair_control :selected").val()
        + $("#eyes_control :selected").val()
        + $("#mouth_control :selected").val()
        + $("#blush_control :selected").val()
        + $("#tears_control :selected").val()
    $("#sprite_code").text(code)
}

function get_from_sprite_code(spritecode){
    // Get the two main portions of the spritecode
    baseCode = spritecode.slice(0, 6);

    if (baseCode.length == 0) {
        return
    }

    else if (baseCode.length < 6) {
        update_sprite_code_status(false, "Invalid spritecode: spritecodes must be 6+ characters")
        return
    }

    optionalCode = spritecode.slice(6);

    // Get base subportions
    //pose = baseCode[0]
    eyebrows = baseCode[0]
    backarms = baseCode[1]
    arms = baseCode[2]
    arms2 = baseCode[3]
    //hair = baseCode[4]
    eyes = baseCode[4]
    mouth = baseCode[5]
    //blush = baseCode[7]
    //tears = baseCode[8]

    // Validate base subportions
    if (!EYEBROW_CODES.includes(eyebrows)){
        update_sprite_code_status(false, "Invalid spritecode: undefined eyebrows " + eyebrows)
        return
    }

    if (!BACKARMS_CODES.includes(backarms)){
        update_sprite_code_status(false, "Invalid spritecode: undefined backarms " + backarms)
        return
        }

    if (!ARMS_CODES.includes(arms)){
        update_sprite_code_status(false, "Invalid spritecode: undefined arms " + arms)
        return
    }

    if (!ARMS2_CODES.includes(arms2)){
        update_sprite_code_status(false, "Invalid spritecode: undefined arms2 " + arms2)
        return
    }

    //if (!HAIR_CODES.includes(hair)){
    //    update_sprite_code_status(false, "Invalid spritecode: undefined hair " + hair)
    //    return
    //}

    if (!EYE_CODES.includes(eyes)){
        update_sprite_code_status(false, "Invalid spritecode: undefined eyes " + eyes)
        return
    }

    if (!MOUTH_CODES.includes(mouth)){
        update_sprite_code_status(false, "Invalid spritecode: undefined mouth " + mouth)
        return
    }

    blush = null
    tears = null
    //emote = null

    // Get, validate optional subportions
    while (optionalCode) {
        if (BLUSH_CODES.includes(optionalCode[0])) {
            blush = optionalCode[0]
            optionalCode = optionalCode.slice(1)
        }
        else {
            if (TEAR_CODES.includes(optionalCode.slice(0,2))) {
                tears = optionalCode.slice(0,2)
                optionalCode = optionalCode.slice(2)
            }
            else {
                update_sprite_code_status(false, "Invalid optional expression subcode " + optionalCode + ". (All optional parts must follow mandatory ones)")
                return
            }
        }
    }
    
    // Finally update the visuals
    //$("#pose_control option[value='" + pose + "']").prop("selected", true)
    $("#eyebrows_control option[value='" + eyebrows + "']").prop("selected", true)
    $("#backarms_control option[value='" + backarms + "']").prop("selected", true)
    $("#arms_control option[value='" + arms + "']").prop("selected", true)
    $("#arms2_control option[value='" + arms2 + "']").prop("selected", true)
    //$("#hair_control option[value='" + hair + "']").prop("selected", true)
    $("#eyes_control option[value='" + eyes + "']").prop("selected", true)
    $("#mouth_control option[value='" + mouth + "']").prop("selected", true)

    if (blush !== null) {
        $("#blush_control option[value='" + blush + "']").prop("selected", true)
    }
    else {
        $("#blush_control option[value='']").prop("selected", true)
    }
    if (tears !== null) {
        $("#tears_control option[value='" + tears + "']").prop("selected", true)
    }
    else {
        $("#tears_control option[value='']").prop("selected", true)
    }



    //if (emote !== null) {
    //    $("#emote_control option[value='" + emote + "']").prop("selected", true)
    //}
    
    //update_layer("pose")
    ul("eyebrows")
    ul("backarms")
    ul("arms")
    ul("arms2")
    //ul("hair")
    ul("eyes")
    ul("mouth")
    ul("blush")
    ul("tears")
    update_sprite_code_status(true)
    //update_layer("emote")
}

// Copies the currently displayed sprite code to the clipboard
function cc(object) {
    object.innerHTML = "[copied!]"
    navigator.clipboard.writeText($("#sprite_code").text())
    setTimeout(() => {
        object.innerHTML = "[copy]"
    }, 250);
}

// Reset everything by reloading the page
function reset_canvas(){
    location.reload()
}


function update_sprite_code_status(isValid, hint="Invalid sprite code.") {
    if (isValid) {
        $("#sprite_code_status").attr("src", "./img/spritecode_status/valid.png?" + new Date())
        $("#sprite_code_status").attr("title", "Valid spritecode!")
    }

    else {
        $("#sprite_code_status").attr("src", "./img/spritecode_status/invalid.png?" + new Date())
        $("#sprite_code_status").attr("title", hint)
    }
}
// When the page loads, show the sprite code for the default sprite combination
$(document).ready(function() {
    usc()
    

    document.getElementById("input_code").addEventListener(
        "keyup",
        function() {
            get_from_sprite_code($("#input_code").val())
        }
    )


    document.getElementById("input_code").addEventListener(
        "paste",
        function() {
            get_from_sprite_code($("#input_code").val())
        }
    )
    // Add map values for input spritecode checks based on select options

    // Compulsary code subportions
    //$.each($("#pose_control option"), function(index, value) {
    //    POSE_CODES.push(value.value)
    //});
    $.each($("#eyebrows_control option"), function(index, value) {
        EYEBROW_CODES.push(value.value)
    });

    $.each($("#backarms_control option"), function(index, value) {
        BACKARMS_CODES.push(value.value)
    });

    $.each($("#arms_control option"), function(index, value) {
        ARMS_CODES.push(value.value)
    });

    $.each($("#arms2_control option"), function(index, value) {
        ARMS2_CODES.push(value.value)
    });

    //$.each($("#hair_control option"), function(index, value) {
    //    HAIR_CODES.push(value.value)
    //});

    $.each($("#eyes_control option"), function(index, value) {
        EYE_CODES.push(value.value)
    });
    $.each($("#mouth_control option"), function(index, value) {
        MOUTH_CODES.push(value.value)
    });
    
    // Optional code subportions
    $.each($("#blush_control option"), function(index, value) {
        if (value.value) {
            BLUSH_CODES.push(value.value)
        }
    });
    $.each($("#tears_control option"), function(index, value) {
        if (value.value) {
            TEAR_CODES.push(value.value)
        }
    });
   
});