/**
 * Utility to prepare data for insertion
 * @param {string} userId - The user ID
 * @param {object} areas - The areas object containing area values
 * @param {boolean} isOtherSelected - Flag to determine the value of 'other'
 * @returns {object} - Prepared data for insertion
 */
export const prepareQuantityData = (areas) => {
    if (!areas) {
        throw new Error("Given data is empty.");
    }

    return {
        linear: areas.linear,
        lType: areas.lType,
        md: areas.md,
        manager: areas.manager,
        small: areas.small,
        ups: areas.ups,
        bms: areas.bms,
        server: areas.server,
        reception: areas.reception,
        lounge: areas.lounge,
        sales: areas.sales,
        phoneBooth: areas.phoneBooth,
        discussionRoom: areas.discussionRoom,
        interviewRoom: areas.interviewRoom,
        conferenceRoom: areas.conferenceRoom,
        boardRoom: areas.boardRoom,
        meetingRoom: areas.meetingRoom,
        meetingRoomLarge: areas.meetingRoomLarge,
        hrRoom: areas.hrRoom,
        financeRoom: areas.financeRoom,
        breakoutRoom: areas.breakoutRoom,
        executiveWashroom: areas.executiveWashroom,
        videoRecordingRoom: areas.videoRecordingRoom,
        other: areas.other,
    };
};
