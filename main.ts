/**
 * TODO
 * 
 * 23-1213-0950
 * 
 * * TYJ avoid parallel independent stacks due to timing confusion.  Have them be lock-stepped even with main_forever stack calling xray_stack as a function. TYJ that when SerialPrint turned off, very smooth/real_time.
 * 
 * ** just need to fix 'detect' and 'reset' mode not statusing
 */
/**
 * Ultrasonic Sensor: 2
 * 
 * * Red board seems best, reliable and real-time < 50cm,  just 100's rarely
 * 
 * ** Need 5v
 * 
 * * RCWL-1601 Green Board
 * 
 * ** Seems very reliable
 */
/**
 * Important Tasks (TODO)
 * 
 * 22-0107-0950
 * 
 * |-- Could this Cpu Dleay/Pause cause duplicate prints?
 * 
 * |-- Not all serial monitor get printed, gets skipped?
 * 
 * |-- Motor from 0 to 360 >> -100 to 100
 * 
 * |-- Clean Var
 */
/**
 * Important Notes
 * 
 * 22-0107-0940
 * 
 * * Using music notes seems unreliable, would stop working
 * 
 * * OLED 24 Char Wide, 8 Rows
 * 
 * * Calibrating Compass: Do not tilt more than 90degrees to earth_ground or compass malfunctions
 * 
 * 23-0204-0700
 * 
 * * TYJ 'Show Icon' takes up too much mcu-power, causing lagging system.  1 sec delay.  Convert to 'plot x y'' allows for real-time response.  :
 * 
 * * Since no mem space, remove 'on screen down: calibrate compass'
 * 
 * * OLED not consume much mcu overhead : )
 */
function xRay_DataMonitor_Func () {
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "See if this will reduce lag: Seems a little better, from avg 150ms to 100ms"
    )
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "500ms too slow, skipping for prev_angle >> 100ms works but a little too fast"
    )
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "TYJ Background:Main and Forever:Xray seems to match 1:1 :)+"
    )
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    "Can only have 1 Background Stack.  2nd Background Stack will be ignored"
    )
    if (_system_Debug_SerialPrint_Bool) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Start New line"
        )
    }
    _system_StringVariable_AsComment = "':' only needed to separate labels vs string_values (vs number_values)"
    if (true) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "For 'ms/cy', normally 3 max length, but 4 for rare spike to 4 digits"
        )
        _local_string_out = "Mode:" + do_StringPadder_AsStringOut_Func(mode_State_Now_Str.substr(0, 20), 20)
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        0
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "a", _local_string_out)
    }
    if (true) {
        _local_string_out = "Li L:" + do_NumberPadder_AsStringOut_Func(sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int, 1, true) + " R:" + do_NumberPadder_AsStringOut_Func(sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int, 1, true)
        if (sensor_Compass_SearchDirection_TurnClockwise_Bool) {
            led.plot(1, 2)
            led.plot(0, 2)
            _local_string_out = "" + _local_string_out + do_StringPadder_AsStringOut_Func(" -> ", 4)
        } else {
            led.plot(3, 2)
            led.plot(4, 2)
            _local_string_out = "" + _local_string_out + do_StringPadder_AsStringOut_Func(" <- ", 4)
        }
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        1
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "b", _local_string_out)
    }
    if (true) {
        _local_string_out = "So D:" + do_NumberPadder_AsStringOut_Func(sensor_SonarSoundEcho_Detect_Range_CM_INT, 3, true) + " L:" + do_NumberPadder_AsStringOut_Func(sensor_SonarSoundEcho_Range_Cm_Left_Int, 3, true) + " R:" + do_NumberPadder_AsStringOut_Func(sensor_SonarSoundEcho_Range_Cm_Right_Int, 3, true)
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        2
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "c", _local_string_out)
    }
    if (true) {
        _local_string_out = "Co N:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Now__Degrees__Int, 3, true) + " -S:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection_Me_Start__Degrees__Int, 3, true) + " =T:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int, 3, false)
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        3
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "d", _local_string_out)
    }
    if (true) {
        _local_string_out = "Co N:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Now__Degrees__Int, 3, true) + " -P:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Prior__Degrees__Int, 3, true) + " =D:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int, 3, true) + "" + sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__BoundaryCross_Str
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        4
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "e", _local_string_out)
    }
    if (true) {
        _local_string_out = "Mo L:" + do_NumberPadder_AsStringOut_Func(motor_Power_Left_Int, 3, true) + " R:" + do_NumberPadder_AsStringOut_Func(motor_Power_Right_Int, 3, true)
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        5
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "f", _local_string_out)
    }
    if (true) {
        _local_string_out = "Cpu ms:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        cpu_MainStack_MsecPerCycle_Duration_Int,
        4,
        0
        ) + " Data ms:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        cpu_XrayStack_MsecPerCycle_Duration_Int,
        4,
        0
        )
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        6
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "g", _local_string_out)
    }
    if (true) {
        _local_string_out = "Dly" + " T:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection_TurnDelay_MSEC_INT, 3, true) + " F:" + do_NumberPadder_AsStringOut_Func(sensor_SonarSoundEcho_Relocate_FwdDelay_MSEC_INT, 4, true) + " R:" + do_NumberPadder_AsStringOut_Func(sensor_LightReflect_Retreat_ReverseDelay_MSEC_INT, 4, true)
        quest_Dashboard.quest_Show_String_For_Oled_SmallFont_Fn(
        _local_string_out,
        0,
        7
        )
        if (_system_Debug_SerialPrint_Bool) {
            serial.writeString(" | ")
            serial.writeString(_local_string_out)
        }
        dashboard_RadioSend_ToScoreboardServer_Func(network_GroupChannel_MyBotAndController_Base0_Int, "h", _local_string_out)
    }
    if (_system_Debug_SerialPrint_Bool) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Create End of Line for Next New Line"
        )
        serial.writeLine("")
    }
    if (false) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Obsolete"
        )
        _system_StringVariable_AsComment = "Standard Delay to prevent Cpu-Overload"
        quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(_system_CpuMcu_Throttle_DELAY_MSEC_INT, quest_Time_Units_Enum.Milliseconds)
    }
    if (false) {
        _system_StringVariable_AsComment = "Standard Delay to prevent Cpu-Overload"
        quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(cpu_XrayStack_MsecPerCycle_Duration_Int, quest_Time_Units_Enum.Milliseconds)
    }
}
function motion_Reverse_Mi_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Mi_NEG_INT
        motor_Power_Right_Int = motor_Power_Mi_NEG_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
function motion_Reverse_Lo_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Lo_NEG_INT
        motor_Power_Right_Int = motor_Power_Lo_NEG_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
// * 2022-0702-1150 TYJ K-value: 1.0, 0.8, 0.6, 0.4 seems best , yet also involved 0.5* so 0.4 * 0.5 = 0.2 : )  can try less later, place signal of where AI is working
// 
// ** Thus 1 * 0.5 = 0.5 :(+
// 
// ** 0.8 * 0.5 = 0.4 :(+
// 
// ** 0.6 * 0.5 = 0.3 :(+
// 
// ** 0.4 * 0.5 = 0.2 :)+
// 
// ** 0.2 too weak, maybe try 0.5
// 
// * 2022-0702-1500 TYJ K-proportional = 0.2, 0.1 too weak to turn-right, yet turn-left is very weak, 0.3 not bad but not as smooth as 0.2
// 
// * add K-integral and K-derivative
function sensor_SoundReflect_Get_Func () {
    if (true) {
        // P8 Designed for Analog Out (versus Digital Out)
        sensor_SonarSoundEcho_Range_Cm_Left_Int = sonar.ping(
        DigitalPin.P8,
        DigitalPin.P2,
        PingUnit.Centimeters
        )
        // P8 Designed for Analog Out (versus Digital Out)
        sensor_SonarSoundEcho_Range_Cm_Right_Int = sonar.ping(
        DigitalPin.P13,
        DigitalPin.P12,
        PingUnit.Centimeters
        )
        if (false) {
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "Appears P1 and P2 interferes with speaker to make clicking sounds"
            )
            // P8 Designed for Analog Out (versus Digital Out)
            sensor_SonarSoundEcho_Range_Cm_Right_Int = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P0,
            PingUnit.Centimeters
            )
        }
    }
}
function dashboard_RadioSend_ToScoreboardServer_Func (my_group_channel_num_in: number, content_sequence_char_txt_in: string, content_body_to_send_txt_in: string) {
    if (true) {
        _local_entire_content_to_send_str_in_length_int = content_body_to_send_txt_in.length
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Round up to next integer"
        )
        _local_loop_count_max = Math.ceil(_local_entire_content_to_send_str_in_length_int / network_Message_Body_LENGTH_MAX_INT)
        for (let index = 0; index <= _local_loop_count_max - 1; index++) {
            network_Message_Body_Str = content_body_to_send_txt_in.substr(index * network_Message_Body_LENGTH_MAX_INT, network_Message_Body_LENGTH_MAX_INT)
            network_Message_Header_Str = "" + content_sequence_char_txt_in.charAt(0) + convertToText(index + 1) + "#:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
            my_group_channel_num_in,
            3,
            0
            )
            network_Message_Str = "" + network_Message_Header_Str + "," + network_Message_Body_Str
            radio.setGroup(network_GroupChannel_ScoreboardServer_BASE0_INT)
            radio.sendString(network_Message_Str)
            if (_system_Debug_SerialPrint_Bool) {
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "To not conflict w/ other 'serial write string'"
                )
                serial.writeLine("")
                serial.writeLine(">>>" + ("" + my_group_channel_num_in + "," + content_sequence_char_txt_in + "," + content_body_to_send_txt_in) + "==" + network_Message_Str + "=" + network_Message_Header_Str + "+" + network_Message_Body_Str + "<")
            }
        }
    }
}
function motion_TurnLeft_CCW_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Hi_NEG_INT
        motor_Power_Right_Int = motor_Power_Hi_POS_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "'on tilt...' not reliable"
    )
    cpu_XrayStack_MsecPerCycle_Duration_Int += -100
})
function OBSOLETE_sensor_CompassDirection_Get_2_Func () {
	
}
input.onButtonPressed(Button.A, function () {
	
})
function motion_Forward_Lo_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Lo_POS_INT
        motor_Power_Right_Int = motor_Power_Lo_POS_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
function motor_Run_Func (motorPowerRightIntIn: number, motorPowerLeftIntIn: number) {
    quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    motorPowerLeftIntIn,
    motorPowerRightIntIn
    )
    if (false) {
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, Math.map(motorPowerRightIntIn, motor_Power_MIN_INT, motor_Power_MAX_INT, 0, 360))
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, Math.map(motorPowerLeftIntIn, motor_Power_MIN_INT, motor_Power_MAX_INT, 0, 360))
    }
}
function sensor_CompassDirection_Get_Func () {
    if (true) {
        _system_StringVariable_AsComment = "Usage of 'compass heading' block auto-requires one-time initialization of screen until loading of another program"
        sensor_Compass_SearchDirection__Me_Prior__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "micro:bit facing opposite direction, thus +180_degrees"
        )
        // * Adjust compass 180-degrees since facing rear of bot
        sensor_Compass_SearchDirection__Me_Now__Degrees__Int = input.compassHeading() + 180
        if (sensor_Compass_SearchDirection__Me_Now__Degrees__Int >= 360) {
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "Since adding degrees, check if pass upper boundary and wrap-around to lower boundar if neeeded"
            )
            // * Keep within range: 0..359
            sensor_Compass_SearchDirection__Me_Now__Degrees__Int += -360
        }
        if (true) {
            if (true) {
                sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int - sensor_Compass_SearchDirection__Me_Prior__Degrees__Int
                if (true) {
                    sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__BoundaryCross_Str = " "
                    if (sensor_Compass_SearchDirection_TurnClockwise_Bool) {
                        quest_Note_5.quest_Show_String_For_Note_Big_Fn(
                        "Flip Flops across boundaries"
                        )
                        if (sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int < -180) {
                            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                            "Was  '< 0' so try '< -180' to give room for accidental turn backwards"
                            )
                            sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int = sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int + 360
                            sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__BoundaryCross_Str = ">"
                            if (_system_Debug_SerialPrint_Bool) {
                                serial.writeLine(" *** CW=T, Deg_NowVsOld (<0 Then +360):" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int, 4, true))
                            }
                        } else {
                            if (false) {
                                serial.writeString("" + (do_NumberPadder_AsStringOut_Func(0, 42, true)))
                            }
                        }
                    } else {
                        if (sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int > 180) {
                            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                            "Was  '< 0' so try '< -180' to give room for accidental turn backwards"
                            )
                            sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int = sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int - 360
                            sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__BoundaryCross_Str = "<"
                            if (_system_Debug_SerialPrint_Bool) {
                                serial.writeLine(" *** CW=F, Deg_NowVsOld (>0 Then -360):" + do_NumberPadder_AsStringOut_Func(sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int, 4, true))
                            }
                        } else {
                            if (false) {
                                serial.writeString("" + (do_NumberPadder_AsStringOut_Func(0, 42, true)))
                            }
                        }
                    }
                }
            }
            sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int + sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Status Rotational Position of Current Search: 0 - 720 Mapped to 0 - 9"
            )
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "Assume 'map' naturally constrains from low to high"
            )
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "Tried 360, need bigger: 720"
            )
            if (false) {
                basic.showNumber(Math.round(Math.map(Math.abs(sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int), 0, 720, 0, 9)))
            }
            if (true) {
                led.unplot(0, 1)
                led.unplot(1, 1)
                led.unplot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
                led.plot(2, Math.round(Math.map(Math.abs(sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int), 0, 360, 0, 4)))
                if (false) {
                    led.plot(Math.round(Math.map(Math.abs(sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int), 0, 360, 0, 4)), 1)
                }
            }
            if (Math.abs(sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int) >= 360) {
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "360 is too big, wrap-around could be activated and disrupt this current check, thus lower max to 180 to be conservative, 270"
                )
                mode_State_Now_Str = "Relocate"
                mode_Search_Reset_Func()
            }
        }
    }
}
// * LIght Sensor #1:
// 
// * Obstacle Avoidance Sensor: Light Sensor
// 
// ** Analog Read Works: Digital Read Not Work
// 
// ** Full Clockwise: 5pm: Led-On always: Value 1001 (Good 1st test to make sure Led can turn on)
// 
// ** While face Black-Tape (or open-dead-space (nothing)) Reverse: Counter-Clockwise till Led-Off (value 35)
// 
// *** This potentiometer setting: Greatest range of dectection
// 
// ** Now Led-Off when facing Black-tape, Insure Led-On when facing non-black-surface
// 
// *** If Led-Off, still, move counter-clockewise till Led-On when facing non-black-surface (range max is roughly 10.0cm to 0.5cm)
// 
// * Red Led
// 
// ** 121: Light Reflection: Y
// 
// ** 1001: No Light Reflection:N
// 
// Safest:
// 
// Led-On: Analog-Out (Value Received) < 500
// 
// Led-Off: Analog-Out (Value Received) > 500
// 
// Greed Led
// 
// ** 35: Light Reflection: Y
// 
// ** 1001: No Light Reflection:N
// 
// ** Need Vin for 5v to drive true=1 signal for micro:bit, Vin=3.3v not enough to meet threshold for true
function do_StringPadder_AsStringOut_Func (string_in: string, string_len_max_in: number) {
    _local_string_out = string_in
    _local_loop_count_max = string_len_max_in - _local_string_out.length
    for (let index = 0; index < _local_loop_count_max; index++) {
        _local_string_out = " " + _local_string_out
    }
    return _local_string_out
}
// * LIght Sensor #1:
// 
// * Obstacle Avoidance Sensor: Light Sensor
// 
// ** Analog Read Works: Digital Read Not Work
// 
// ** Full Clockwise: 5pm: Led-On always: Value 1001 (Good 1st test to make sure Led can turn on)
// 
// ** While face Black-Tape (or open-dead-space (nothing)) Reverse: Counter-Clockwise till Led-Off (value 35)
// 
// *** This potentiometer setting: Greatest range of dectection
// 
// ** Now Led-Off when facing Black-tape, Insure Led-On when facing non-black-surface
// 
// *** If Led-Off, still, move counter-clockewise till Led-On when facing non-black-surface (range max is roughly 10.0cm to 0.5cm)
// 
// * Red Led
// 
// ** 121: Light Reflection: Y
// 
// ** 1001: No Light Reflection:N
// 
// Safest:
// 
// Led-On: Analog-Out (Value Received) < 500
// 
// Led-Off: Analog-Out (Value Received) > 500
// 
// Greed Led
// 
// ** 35: Light Reflection: Y
// 
// ** 1001: No Light Reflection:N
// 
// ** Need Vin for 5v to drive true=1 signal for micro:bit, Vin=3.3v not enough to meet threshold for true
function do_NumberPadder_AsStringOut_Func (number_in: number, string_len_max_in: number, rounding_requested_bool_in: boolean) {
    if (rounding_requested_bool_in) {
        _local_string_out = convertToText(Math.round(number_in))
    } else {
        _local_string_out = convertToText(number_in)
    }
    _local_loop_count_max = string_len_max_in - _local_string_out.length
    for (let index = 0; index < _local_loop_count_max; index++) {
        _local_string_out = " " + _local_string_out
    }
    return _local_string_out
}
function mode_Search_Reset_Func () {
    quest_Note_5.quest_Show_String_For_Note_Big_Fn(
    "Seems not working"
    )
    if (true) {
        sensor_Compass_SearchDirection_Me_Start__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
        quest_Note_4.quest_Show_String_For_Note_Small_Fn(
        "For Now, keep it simple, just turn in clockwise direction."
        )
        if (false) {
            // * 50% Probability to Scan Left or Right
            sensor_Compass_SearchDirection_TurnClockwise_Bool = true
            // * 50% Probability to Scan Left or Right
            sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
        }
        // * 50% Probability to Scan Left or Right
        sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
        sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
    }
}
/**
 * 23-1113
 * 
 * * 'Backgorund' not any faster vs. 'forever' stack.
 * 
 * * 'Serial Print off' much faster 150ms to 8ms/ cpu_cycle
 */
/**
 * Ultrasonic Sensor: 1
 * 
 * * Red-Wire 3-5v
 * 
 * ** TYJ does work but within 35cm and it adds 10cm (measures 10cm extra) too much, yet seems consistent.  Also power should come from its 5v and not 3.3v (not work) : ).
 * 
 * * HC-SR04P much more reliable even up to 70-80cm, and more accurate under 30cm not adding 10cm, yet more like 5 or so, seems as reliable as a LEGO EV3.  Also 'Show console Device' very nice to display LED values.  : )
 * 
 * * HC-SR04 w/ metal-bin on top: also very reliable up to 60cm, appears to be less accurate <= 60, flips to 4 when  > 30
 * 
 * * Tried Trig=P0, Echo=P1 not work
 * 
 * * Best Trig=P8 Digital Out, Echo=P0 Analog In= 50cm or less
 */
// * LIght Sensor #2:
// 
// * IR Sensor: MH-Sensor Series: TYJ D0 works yet need 5v, works w/ pin 13 :)+
// 
// ** Seems better facing down, since easier to control height, less room for builder's error to be off +/- 0.1cm
// 
// ** Digital Read :)+
function mode_Detect_Func () {
    basic.clearScreen()
    led.plot(2, 4)
    motion_Forward_Hi_Func()
}
input.onButtonPressed(Button.AB, function () {
    _system_Debug_SerialPrint_XrayStack_Bool = !(_system_Debug_SerialPrint_XrayStack_Bool)
    if (_system_Debug_SerialPrint_XrayStack_Bool) {
        led.plot(1, 4)
        led.unplot(1, 0)
    } else {
        led.unplot(1, 4)
        led.plot(1, 0)
    }
})
input.onButtonPressed(Button.B, function () {
    mode_State_Pause_Bool = !(mode_State_Pause_Bool)
    if (mode_State_Pause_Bool) {
        led.plot(0, 4)
        led.unplot(0, 0)
    } else {
        led.unplot(0, 4)
        led.plot(0, 0)
    }
})
function mode_Retreat_Func () {
    basic.clearScreen()
    led.plot(2, 0)
    if (false) {
        motion_Reverse_Lo_Func()
    }
    motion_Reverse_Mi_Func()
    basic.pause(sensor_LightReflect_Retreat_ReverseDelay_MSEC_INT)
    motion_Stop_Func()
}
function motion_Stop_Func () {
    if (true) {
        motor_Power_Right_Int = motor_Power_STOP_INT
        motor_Power_Left_Int = motor_Power_STOP_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
function mode_Relocate_Func () {
    basic.clearScreen()
    led.plot(1, 2)
    led.plot(3, 2)
    if (sensor_Compass_SearchDirection_TurnClockwise_Bool) {
        motion_TurnLeft_CCW_Func()
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Rotate fixed roughly 180_degrees -or- randomly"
        )
        basic.pause(sensor_Compass_SearchDirection_TurnDelay_MSEC_INT * 10)
    } else {
        motion_TurnRight_CW_Func()
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Rotate fixed roughly 180_degrees -or- randomly"
        )
        basic.pause(sensor_Compass_SearchDirection_TurnDelay_MSEC_INT * 10)
    }
    _system_StringVariable_AsComment = "'Show 0' to indicate Search_Scan will begin here"
    if (false) {
        basic.showNumber(0)
    }
    motion_Forward_Lo_Func()
    // * 1 sec may be too long
    // * now at slower motors, keep at 1sec since 0.5sec too fast
    basic.pause(sensor_SonarSoundEcho_Relocate_FwdDelay_MSEC_INT)
    motion_Stop_Func()
}
function sensor_LightReflect_Get_Func () {
    if (true) {
        if (pins.digitalReadPin(DigitalPin.P15) == _system_Bool_FALSE_AS_0_INT) {
            sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int = _system_Bool_TRUE_AS_1_INT
        } else {
            sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int = _system_Bool_FALSE_AS_0_INT
        }
        if (pins.digitalReadPin(DigitalPin.P14) == _system_Bool_FALSE_AS_0_INT) {
            sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int = _system_Bool_TRUE_AS_1_INT
        } else {
            sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int = _system_Bool_FALSE_AS_0_INT
        }
        if (false) {
            sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int = pins.digitalReadPin(DigitalPin.P15)
            sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int = pins.digitalReadPin(DigitalPin.P14)
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "'on tilt...' not reliable"
    )
    cpu_XrayStack_MsecPerCycle_Duration_Int += 100
})
function mode_Search_Continue_Func () {
    // * 500 not bad, try 200, 100 too fast since delta could be 1to2 degrees == 359to358 degrees.
    if (sensor_Compass_SearchDirection_TurnClockwise_Bool) {
        motion_TurnRight_CW_Func()
        basic.pause(sensor_Compass_SearchDirection_TurnDelay_MSEC_INT)
        motion_Stop_Func()
    } else {
        motion_TurnLeft_CCW_Func()
        basic.pause(sensor_Compass_SearchDirection_TurnDelay_MSEC_INT)
        motion_Stop_Func()
    }
}
function motion_TurnRight_CW_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Hi_POS_INT
        motor_Power_Right_Int = motor_Power_Hi_NEG_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
function motion_Forward_Hi_Func () {
    if (true) {
        motor_Power_Left_Int = motor_Power_Hi_POS_INT
        motor_Power_Right_Int = motor_Power_Hi_POS_INT
        motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
function OBSOLETE_get_sensor_Compass_SearchDirection_Get__Me_Now__Degrees__Int_Func () {
    if (true) {
        _system_StringVariable_AsComment = "Usage of 'compass heading' block auto-requires one-time initialization of screen until loading of another program"
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "micro:bit facing opposite direction, thus +180_degrees"
        )
        // * Adjust compass 180-degrees since facing rear of bot
        _local_value_int = input.compassHeading() + 180
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Since adding degrees, check if pass upper boundary and wrap-around to lower boundar if neeeded"
        )
        if (_local_value_int >= 360) {
            // * Keep within range: 0..359
            _local_value_int += -360
        }
        return _local_value_int
    }
}
let cpu_MainStack_MsecPerCycle_Now_Int = 0
let cpu_MainStack_MsecPerCycle_Old_Int = 0
let _local_value_int = 0
let network_Message_Str = ""
let network_Message_Header_Str = ""
let network_Message_Body_Str = ""
let _local_loop_count_max = 0
let _local_entire_content_to_send_str_in_length_int = 0
let cpu_MainStack_MsecPerCycle_Duration_Int = 0
let motor_Power_Right_Int = 0
let sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__BoundaryCross_Str = ""
let sensor_Compass_SearchDirection__Me_Diff_NowVsPrior__Degrees__Int = 0
let sensor_Compass_SearchDirection__Me_Prior__Degrees__Int = 0
let sensor_Compass_SearchDirection_Me_Start__Degrees__Int = 0
let sensor_Compass_SearchDirection__Me_Now__Degrees__Int = 0
let _local_string_out = ""
let network_GroupChannel_ScoreboardServer_BASE0_INT = 0
let network_GroupChannel_MyBotAndController_Base0_Int = 0
let network_Message_Body_LENGTH_MAX_INT = 0
let network_Message_Header_LENGTH_MAX_INT = 0
let network_Message_LENGTH_MAX_INT = 0
let cpu_XrayStack_MsecPerCycle_Duration_Int = 0
let mode_State_Pause_Bool = false
let _system_Debug_OledPrint_Bool = false
let _system_Debug_SerialPrint_XrayStack_Bool = false
let _system_Debug_SerialPrint_Bool = false
let mode_State_Now_Str = ""
let sensor_SonarSoundEcho_Detect_ForwardDelay_MSEC_INT = 0
let sensor_LightReflect_Retreat_ReverseDelay_MSEC_INT = 0
let sensor_SonarSoundEcho_Relocate_FwdDelay_MSEC_INT = 0
let sensor_Compass_SearchDirection_TurnDelay_MSEC_INT = 0
let sensor_Compass_SearchDirection_TurnClockwise_Bool = false
let sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
let AOBSOLELTEsensor_Compass_SearchDirection_SetupDoneAndNowActive_Bool = false
let sensor_SonarSoundEcho_Range_Cm_Right_Int = 0
let sensor_SonarSoundEcho_Range_Cm_Left_Int = 0
let sensor_SonarSoundEcho_Detect_Range_CM_INT = 0
let AOBSOLETEsensor_LightAReflect_AnalogRaw_PerimeterAlert_MIN_INT_OBSOLETE = 0
let sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int = 0
let sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int = 0
let motor_Power_Left_Int = 0
let motor_Power_STOP_INT = 0
let motor_Power_Hi_POS_INT = 0
let motor_Power_Hi_NEG_INT = 0
let motor_Power_Mi_POS_INT = 0
let motor_Power_Mi_NEG_INT = 0
let motor_Power_Lo_POS_INT = 0
let motor_Power_Lo_NEG_INT = 0
let motor_Power_MAX_INT = 0
let motor_Power_MIN_INT = 0
let motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = false
let motor_Type_Geekservo_0pt5KgCm_Servo_360DegMax_On_Bool = false
let _system_CpuMcu_Throttle_DELAY_MSEC_INT = 0
let _system_Bool_TRUE_AS_1_INT = 0
let _system_Bool_FALSE_AS_0_INT = 0
let _system_StringVariable_AsComment = ""
let _system_Mode_Debug_Hi_Bool = false
let _system_Mode_Debug_Lo_Bool = false
_system_StringVariable_AsComment = "Setup"
if (true) {
    basic.showIcon(IconNames.Happy)
    basic.pause(2000)
}
if (true) {
    _system_StringVariable_AsComment = "Useful to convert Digital-Pin Reads to Bool-Types"
    _system_Bool_FALSE_AS_0_INT = 0
    _system_Bool_TRUE_AS_1_INT = 1
}
if (true) {
    // Was 500ms, but decrease for more real-time gyroscope processing, try 100ms for 10fps, real-time, 50ms for 20fps, vs. debugging 1sec or 500ms :); 100ms
    _system_CpuMcu_Throttle_DELAY_MSEC_INT = 100
}
if (true) {
    _system_StringVariable_AsComment = "Geekservo: 0.5kg*cm: Green Continuous Servo: 360degrees Max"
    _system_StringVariable_AsComment = "If pin is Open (Default) or Connected to Pin-V, then reads Hi (1). "
    motor_Type_Geekservo_0pt5KgCm_Servo_360DegMax_On_Bool = true
    motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = false
    if (true) {
        _system_StringVariable_AsComment = "Special Parameters"
        if (true) {
            motor_Power_MIN_INT = -100
            motor_Power_MAX_INT = 100
        }
        // * 120 & 240 maybe too fast to detect, so not delta 60 but delta 30 with 180 as stop, so 150 210, too slow, try 135 225 delta=45 >> 45/180 =0.25 >> 25, -25
        // 
        // * for -100,100 >> 15 idle_max >> 20 forward_min too slow: yet still try 25, -25; try 30 -+
        if (true) {
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "15"
            )
            motor_Power_Lo_NEG_INT = -15
            motor_Power_Lo_POS_INT = 15
        }
        // * 120 & 240 maybe too fast to detect, so not delta 60 but delta 30 with 180 as stop, so 150 210, too slow, try 135 225 delta=45 >> 45/180 =0.25 >> 25, -25
        // 
        // * for -100,100 >> 15 idle_max >> 20 forward_min too slow: yet still try 25, -25; try 30 -+
        if (true) {
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "30, try 25"
            )
            motor_Power_Mi_NEG_INT = -25
            motor_Power_Mi_POS_INT = 25
        }
        // * 120 & 240 maybe too fast to detect, so not delta 60 but delta 30 with 180 as stop, so 150 210, too slow, try 135 225 delta=45 >> 45/180 =0.25 >> 25, -25
        // 
        // * for -100,100 >> 15 idle_max >> 20 forward_min too slow: yet still try 25, -25; try 30 -+
        if (true) {
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "60, slower 45, try 35"
            )
            motor_Power_Hi_NEG_INT = -35
            motor_Power_Hi_POS_INT = 35
        }
        motor_Power_STOP_INT = 0
    }
    if (true) {
        motor_Power_Left_Int = motor_Power_STOP_INT
        motor_Power_Left_Int = motor_Power_STOP_INT
        motion_Stop_Func()
    }
}
if (true) {
    _system_StringVariable_AsComment = "sensor_LightReflectionNot"
    sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int = _system_Bool_FALSE_AS_0_INT
    sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int = _system_Bool_FALSE_AS_0_INT
    // 22-1231 was 500 but miss black tape of 200-500, so try 100 since
    AOBSOLETEsensor_LightAReflect_AnalogRaw_PerimeterAlert_MIN_INT_OBSOLETE = 100
}
if (true) {
    _system_StringVariable_AsComment = "sensor_SonarSoundEcho"
    quest_Note_5.quest_Show_String_For_Note_Small_Fn(
    "Orig 20, but try 5 for quick testing, Moved back to 20, try 10 since in_between"
    )
    quest_Note_5.quest_Show_String_For_Note_Small_Fn(
    "try 20 too long, 15"
    )
    // 22-0105 was 40, go smaller for faster testing: 10, too short: 20
    sensor_SonarSoundEcho_Detect_Range_CM_INT = 15
    sensor_SonarSoundEcho_Range_Cm_Left_Int = 0
    sensor_SonarSoundEcho_Range_Cm_Right_Int = 0
}
if (true) {
    _system_StringVariable_AsComment = "Search/Relocate & Detect"
    AOBSOLELTEsensor_Compass_SearchDirection_SetupDoneAndNowActive_Bool = false
    sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "Default to True for Simplicity"
    )
    sensor_Compass_SearchDirection_TurnClockwise_Bool = true
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "200ms, try 100ms, 20ms@30%power, try 20ms@100% too fast: for quicker response, try 100"
    )
    sensor_Compass_SearchDirection_TurnDelay_MSEC_INT = 100
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "1000ms"
    )
    sensor_SonarSoundEcho_Relocate_FwdDelay_MSEC_INT = 1000
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "200ms"
    )
    sensor_LightReflect_Retreat_ReverseDelay_MSEC_INT = 2000
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Keep short so that it can stop to detect boundaries, 2000, 500, 100, 50"
    )
    sensor_SonarSoundEcho_Detect_ForwardDelay_MSEC_INT = 50
}
if (true) {
    OLED12864_I2C.init(60)
    OLED12864_I2C.on()
    OLED12864_I2C.zoom(false)
    OLED12864_I2C.clear()
}
if (true) {
    mode_State_Now_Str = "Search_Reset"
}
if (true) {
    quest_Note_5.quest_Show_String_For_Note_Small_Fn(
    "Debugging"
    )
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "'Debug_SerialPrint' will slow down processor, so turn off for optimum performance as default"
    )
    _system_Debug_SerialPrint_Bool = false
    _system_Debug_SerialPrint_XrayStack_Bool = true
    _system_Debug_OledPrint_Bool = true
    mode_State_Pause_Bool = false
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Deafault was 500, 100"
    )
    cpu_XrayStack_MsecPerCycle_Duration_Int = 100
}
if (false) {
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "Speaker makes sound when powering motors"
    )
    music.setBuiltInSpeakerEnabled(false)
    music.setVolume(0)
}
if (true) {
    quest_Note_3.quest_Show_String_For_Note_Small_Fn(
    "IMPORTANT: Network Message will be cut off beyond Max Length"
    )
    network_Message_LENGTH_MAX_INT = 18
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Example: '#:101a1', '#:101a2', '#:101b1', '#:101b2', #:101b3'"
    )
    network_Message_Header_LENGTH_MAX_INT = 7
    network_Message_Body_LENGTH_MAX_INT = network_Message_LENGTH_MAX_INT - network_Message_Header_LENGTH_MAX_INT
}
if (true) {
    quest_Note_3.quest_Show_String_For_Note_Small_Fn(
    "Set Group_Channel_# for Both Bot & Controller_Joystick"
    )
    // * Good Stress Test: 199 (to test all dots for 10's, 1's; 255 (to test all dots for 100's: 1,2)
    network_GroupChannel_MyBotAndController_Base0_Int = 1
    // Constant Channel # for Master Server, which Receives Everyone's Score. Use 255 vs 0, since 0 could be easily not not used by normal users
    network_GroupChannel_ScoreboardServer_BASE0_INT = 255
}
// * Motors
// 
// ** Significant Range for 180-Degrees: 60 to 85 then 95 to 120
loops.everyInterval(cpu_XrayStack_MsecPerCycle_Duration_Int, function () {
    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
    "No decreased frequencey from 100 to 1000 to 1500"
    )
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    "'Search_Cont' repeats 2-3x"
    )
})
basic.forever(function () {
    quest_Note_5.quest_Show_String_For_Note_Big_Fn(
    "TYJ This works"
    )
})
basic.forever(function () {
    quest_Note_5.quest_Show_String_For_Note_Small_Fn(
    "Try 'forever' to see if prints are no longer doubled/quadrupled but single"
    )
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    "'while(true)' replaced 'if(true)'"
    )
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    "'run in background' seems faster by x2 to x5 vs 'forever' atack"
    )
    while (true) {
        if (true) {
            cpu_MainStack_MsecPerCycle_Old_Int = cpu_MainStack_MsecPerCycle_Now_Int
            cpu_MainStack_MsecPerCycle_Now_Int = control.millis()
            cpu_MainStack_MsecPerCycle_Duration_Int = cpu_MainStack_MsecPerCycle_Now_Int - cpu_MainStack_MsecPerCycle_Old_Int
        }
        if (true) {
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Clear Retreat Dots"
            )
            led.unplot(2, 0)
        }
        if (true) {
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Clear Relocate Dots"
            )
            led.unplot(1, 2)
            led.unplot(0, 2)
            led.unplot(3, 2)
            led.unplot(4, 2)
        }
        if (true) {
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Clear Detect Dots"
            )
            led.unplot(0, 4)
            led.unplot(2, 4)
            led.unplot(4, 4)
        }
        if (true) {
            sensor_LightReflect_Get_Func()
            sensor_SoundReflect_Get_Func()
            sensor_CompassDirection_Get_Func()
        }
        if (mode_State_Now_Str == "Search_Reset_OLD") {
            if (true) {
                sensor_Compass_SearchDirection_Me_Start__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
                // * 50% Probability to Scan Left or Right
                sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
                sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
                basic.showIcon(IconNames.Silly)
                serial.writeLine("*** *** 1:" + mode_State_Now_Str)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
                mode_State_Now_Str = "Search_Continue"
            }
            if (false) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Can be * 'Retreat__Search_Reset', * 'Detect__Search_Reset', * 'Relocate__Search_Reset'"
                )
                mode_State_Now_Str = "Search_Reset:Start"
                basic.showIcon(IconNames.Silly)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "'includes' not seem to work, hardcode explicitly all optinos"
                )
                mode_Search_Reset_Func()
                mode_State_Now_Str = "Search_Continue"
            }
        }
        if (mode_State_Now_Str == "Search_Reset_3") {
            if (true) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Can be * 'Retreat__Search_Reset', * 'Detect__Search_Reset', * 'Relocate__Search_Reset'"
                )
                mode_State_Now_Str = "Search_Reset:Start"
                basic.showIcon(IconNames.Surprised)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "'includes' not seem to work, hardcode explicitly all optinos"
                )
                mode_Search_Reset_Func()
                mode_State_Now_Str = "Search_Continue"
            }
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "Keep Blank since cannot delete this branch"
            )
        } else if (mode_State_Pause_Bool) {
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Must be first state_check since 'Pause' preempts all states"
            )
            mode_State_Now_Str = "Pause"
            motion_Stop_Func()
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "Avoid 'continue' which will cause a system freeze (oled, serial print, cpu freeze), could be a 'bug'"
            )
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "TYJ that 'break' works"
            )
            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
            "Actually adding extra if_true loop allows 'continue' to work"
            )
        } else if (sensor_LightReflect_DigitalRaw_0or1Bool_Left_Int == _system_Bool_FALSE_AS_0_INT || sensor_LightReflect_DigitalRaw_0or1Bool_Right_Int == _system_Bool_FALSE_AS_0_INT) {
            if (true) {
                mode_State_Now_Str = "Retreat"
                if (true) {
                    basic.clearScreen()
                    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                    "micro:bit screen is upside_down"
                    )
                    led.plot(2, 0)
                }
                mode_Retreat_Func()
                if (true) {
                    mode_State_Now_Str = "Retreat_Reset"
                    sensor_Compass_SearchDirection_Me_Start__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
                    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                    "For Now, keep it simple, just turn in clockwise direction."
                    )
                    if (true) {
                        // * 50% Probability to Scan Left or Right
                        sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
                    }
                    sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
                }
                mode_State_Now_Str = "Search_Reset"
            }
        } else if (sensor_SonarSoundEcho_Range_Cm_Left_Int <= sensor_SonarSoundEcho_Detect_Range_CM_INT && sensor_SonarSoundEcho_Range_Cm_Left_Int > 0 || sensor_SonarSoundEcho_Range_Cm_Right_Int <= sensor_SonarSoundEcho_Detect_Range_CM_INT && sensor_SonarSoundEcho_Range_Cm_Right_Int > 0) {
            if (true) {
                mode_State_Now_Str = "Detect"
                if (true) {
                    basic.clearScreen()
                    if (true) {
                        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                        "micro:bit screen is upside_down"
                        )
                        led.plot(2, 4)
                    }
                    motor_Power_Left_Int = motor_Power_Lo_POS_INT
                    motor_Power_Right_Int = motor_Power_Lo_POS_INT
                }
                if (sensor_SonarSoundEcho_Range_Cm_Left_Int <= sensor_SonarSoundEcho_Detect_Range_CM_INT && sensor_SonarSoundEcho_Range_Cm_Left_Int > 0) {
                    if (true) {
                        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                        "micro:bit screen is upside_down"
                        )
                        led.plot(4, 4)
                    }
                    motor_Power_Right_Int = motor_Power_Hi_POS_INT
                }
                if (sensor_SonarSoundEcho_Range_Cm_Right_Int <= sensor_SonarSoundEcho_Detect_Range_CM_INT && sensor_SonarSoundEcho_Range_Cm_Right_Int > 0) {
                    if (true) {
                        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                        "micro:bit screen is upside_down"
                        )
                        led.plot(0, 4)
                    }
                    motor_Power_Left_Int = motor_Power_Hi_POS_INT
                }
                motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(sensor_SonarSoundEcho_Detect_ForwardDelay_MSEC_INT, quest_Time_Units_Enum.Milliseconds)
                motion_Stop_Func()
                if (true) {
                    mode_State_Now_Str = "Detect_Reset"
                    sensor_Compass_SearchDirection_Me_Start__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
                    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                    "For Now, keep it simple, just turn in clockwise direction."
                    )
                    if (true) {
                        // * 50% Probability to Scan Left or Right
                        sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
                    }
                    sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
                }
                mode_State_Now_Str = "Search_Reset"
            }
        } else if (mode_State_Now_Str == "Relocate") {
            mode_Relocate_Func()
            if (true) {
                mode_State_Now_Str = "Relocate_Reset"
                sensor_Compass_SearchDirection_Me_Start__Degrees__Int = sensor_Compass_SearchDirection__Me_Now__Degrees__Int
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "For Now, keep it simple, just turn in clockwise direction."
                )
                if (true) {
                    // * 50% Probability to Scan Left or Right
                    sensor_Compass_SearchDirection_TurnClockwise_Bool = Math.randomBoolean()
                }
                sensor_Compass_SearchDirection__Me_Total_Turn__Degrees__Int = 0
            }
            mode_State_Now_Str = "Search_Reset"
        } else if (mode_State_Now_Str == "Search_Continue") {
            mode_Search_Continue_Func()
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "Mode remains 'Search_Continue'"
            )
        } else if (mode_State_Now_Str == "Search_Reset") {
            quest_Note_5.quest_Show_String_For_Note_Big_Fn(
            "Seems to be skipped, thus do inline above"
            )
            if (true) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Can be * 'Retreat__Search_Reset', * 'Detect__Search_Reset', * 'Relocate__Search_Reset'"
                )
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "'includes' not seem to work, hardcode explicitly all optinos"
                )
                serial.writeLine("*** *** 2:" + mode_State_Now_Str)
                mode_State_Now_Str = "Search_Continue"
            }
            if (false) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Can be * 'Retreat__Search_Reset', * 'Detect__Search_Reset', * 'Relocate__Search_Reset'"
                )
                mode_State_Now_Str = "Search_Reset_2:Start"
                basic.showIcon(IconNames.Yes)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
                quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                "'includes' not seem to work, hardcode explicitly all optinos"
                )
                mode_Search_Reset_Func()
                serial.writeLine("*** *** 2:" + mode_State_Now_Str)
                mode_State_Now_Str = "Search_Continue"
            }
        } else {
            basic.showString("* ERROR 23-1118-1430-JWC:" + mode_State_Now_Str)
        }
        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
        "Turn Off Delay Since will burden Real-Time Response of Detect"
        )
        if (_system_Debug_SerialPrint_XrayStack_Bool) {
            xRay_DataMonitor_Func()
        }
    }
})
