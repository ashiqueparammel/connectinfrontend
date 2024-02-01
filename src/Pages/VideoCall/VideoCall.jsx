import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import { AppKey, ServerSecret } from '../../Constants/Constants';


function VideoCall() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);

    const location = useLocation();
    const data = location.state?.data || "";

    const senderdetails = data[0];
    const recipientdetails = data[1];
    let roomId, receiverId;
    if (data) {
        roomId = senderdetails.id.toString();
        receiverId = recipientdetails.id.toString();
    }

    if (!data) {
        const queryParams = new URLSearchParams(location.search);
        roomId = queryParams.get("roomId");
        receiverId = queryParams.get("receiverId");
    } else {
        roomId = senderdetails.id.toString();
        receiverId = recipientdetails.id.toString();
    }

    const myMeeting = async (element) => {
        try {
            // generate Kit Token
            const appID = parseInt(AppKey);
            const serverSecret = ServerSecret;
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                decode.email
            );
    
            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken);
    
            // start the call
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: "Personal link",
                        url: window.location.protocol +
                            "//" +
                            window.location.host +
                            "/videocall/" +
                            "?roomId=" +
                            roomId +
                            "&receiverId=" +
                            receiverId,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
        } catch (error) {
            console.error("Error in myMeeting:", error);
            // Handle error appropriately
        }
    };
    
    return (
        <>

            <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
        </>
    )
}

export default VideoCall