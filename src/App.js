import React, { useState, useEffect } from "react";
import AreaInput from "./AreaInput";
import OpenWorkspaces from "./OpenWorkspaces";
import Cabins from "./Cabins";
import SupportSpaces from "./SupportSpaces";
import PublicSpaces from "./PublicSpaces";
import MeetingRooms from "./MeetingRooms";
import { Tooltip } from "react-tooltip";
import Treemap from "./Treemap";
import Modal from "./Modal";
import Card from "./Card";
import "./styles.css";
import "./fixes.css";

const initialAreaValues = {
  linear: 24,
  lType: 34,
  md: 120,
  manager: 80,
  small: 80,
  ups: 90,
  bms: 90,
  server: 40,
  reception: 120,
  lounge: 150,
  sales: 80,
  phoneBooth: 25,
  discussionRoom: 380,
  interviewRoom: 100,
  conferenceRoom: 250,
  boardRoom: 325,
  meetingRoom: 100,
  meetingRoomLarge: 120,
  hrRoom: 80,
  financeRoom: 100,
  breakoutRoom: 80,
  executiveWashroom: 60,
  videoRecordingRoom: 80,
  other: 1,
};

const initialAreas = {
  linear: 0,
  lType: 0,
  md: 0,
  manager: 0,
  small: 0,
  ups: 0,
  bms: 0,
  server: 0,
  reception: 0,
  lounge: 0,
  sales: 0,
  phoneBooth: 0,
  discussionRoom: 0,
  interviewRoom: 0,
  conferenceRoom: 0,
  boardRoom: 0,
  meetingRoom: 0,
  meetingRoomLarge: 0,
  hrRoom: 0,
  financeRoom: 0,
  breakoutRoom: 0,
  executiveWashroom: 0,
  videoRecordingRoom: 0,
  other: 0,
};

const MAX_AREA = 25000;
const MIN_AREA = 1500;

const calculateReceptionArea = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 3500) {
    return Math.round(totalArea * 0.08);
  } else if (totalArea >= 3500 && totalArea < 4500) {
    return Math.round(totalArea * 0.06);
  } else if (totalArea >= 4500 && totalArea < 5500) {
    return Math.round(totalArea * 0.05);
  } else if (totalArea >= 5500 && totalArea < 6500) {
    return Math.round(totalArea * 0.045);
  } else if (totalArea >= 6500 && totalArea < 12000) {
    return 300;
  } else if (totalArea >= 12000 && totalArea < 18000) {
    return 500;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return 700;
  } else {
    return 0;
  }
};

const calculateLoungeArea = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 2500) {
    return Math.round(totalArea * 0.11);
  } else if (totalArea >= 2500 && totalArea < 4500) {
    return Math.round(totalArea * 0.06);
  } else if (totalArea >= 4500 && totalArea < 6500) {
    return Math.round(totalArea * 0.05);
  } else if (totalArea >= 6500 && totalArea < 8500) {
    return Math.round(totalArea * 0.045);
  } else if (totalArea >= 8500 && totalArea <= 10000) {
    return Math.round(totalArea * 0.04);
  } else if (totalArea > 10000 && totalArea <= 25000) {
    return Math.round(totalArea * 0.04);
  } else {
    return 0;
  }
};

const calculateLinear = (totalArea) => {
  if (totalArea >= 1500 && totalArea <= 25000) {
    return Math.round(totalArea * 0.40);
  } else {
    return 0;
  }
};

const calculateLType = (totalArea) => {
  if (totalArea >= 9000 && totalArea < 12000) {
    return 34 * 5;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return 34 * 10;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return 34 * 15;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return 34 * 20;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return 34 * 25;
  } else {
    return 0;
  }
};

const calculateMd = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 6000) {
    return 120 * 1;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return 120 * 2;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return 120 * 3;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return 120 * 4;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return 120 * 5;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return 120 * 6;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return 120 * 7;
  } else {
    return 0;
  }
};

const calculateManager = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 3000) {
    return 80 * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    return 80 * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return 80 * 3;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return 80 * 4;
  } else if (totalArea >= 12000 && totalArea < 15000) {
    return 80 * 5;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return 80 * 6;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return 80 * 7;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return 80 * 8;
  } else {
    return 0;
  }
};

const calculateSmall = (totalArea, handleSmallCabinPeopleCountChange) => {
  if (totalArea >= 1500 && totalArea < 3000) {
    handleSmallCabinPeopleCountChange(4 * 1);
    return 80 * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    handleSmallCabinPeopleCountChange(4 * 2);
    return 80 * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    handleSmallCabinPeopleCountChange(4 * 3);
    return 80 * 3;
  } else if (totalArea >= 9000 && totalArea <= 25000) {
    handleSmallCabinPeopleCountChange(4 * 4);
    return 80 * 4;
  } else {
    return 0;
  }
};

const calculateDiscussionRoom = (totalArea) => {
  if (totalArea >= 12000 && totalArea <= 25000) {
    return 380 * 1;
  } else {
    return 0;
  }
};

const calculateInterviewRoom = (totalArea) => {
  if (totalArea >= 6000 && totalArea < 12000) {
    return 100 * 1;
  } else if (totalArea >= 12000 && totalArea <= 25000) {
    return 100 * 2;
  } else {
    return 0;
  }
};

const calculateConferenceRoom = (totalArea) => {
  if (totalArea >= 9000 && totalArea < 15000) {
    return 250 * 2;
  } else if (totalArea >= 15000 && totalArea < 18000) {
    return 250 * 3;
  } else if (totalArea >= 18000 && totalArea < 21000) {
    return 250 * 4;
  } else if (totalArea >= 21000 && totalArea <= 25000) {
    return 250 * 5;
  } else {
    return 0;
  }
};

const calculateBoardRoom = (totalArea) => {
  if (totalArea >= 12000 && totalArea <= 25000) {
    return 325 * 1;
  } else {
    return 0;
  }
};

const calculateMeetingRoom = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 3000) {
    return 100 * 1;
  } else if (totalArea >= 3000 && totalArea < 6000) {
    return 100 * 2;
  } else if (totalArea >= 6000 && totalArea < 9000) {
    return 100 * 3;
  } else if (totalArea >= 9000 && totalArea < 12000) {
    return 100 * 4;
  } else if (totalArea >= 12000 && totalArea <= 25000) {
    return 100 * 6;
  } else {
    return 0;
  }
};

const calculateMeetingRoomLarge = (totalArea) => {
  if (totalArea >= 15000 && totalArea <= 25000) {
    return 120 * 2;
  } else {
    return 0;
  }
};

const calculateVideoRecordingRoom = (totalArea) => {
  if (totalArea >= 15000 && totalArea <= 25000) {
    return 80 * 1;
  } else {
    return 0;
  }
};

const calculatePhoneBooth = (totalArea) => {
  if (totalArea >= 3000 && totalArea < 9000) {
    return 25 * 2;
  } else if (totalArea >= 9000 && totalArea < 18000) {
    return 25 * 4;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return 25 * 8;
  } else {
    return 0;
  }
};

const calculateServer = (totalArea) => {
  if (totalArea >= 1500 && totalArea < 6000) {
    return 40 * 1;
  } else if (totalArea >= 6000 && totalArea < 12000) {
    return 40 * 2;
  } else if (totalArea >= 12000 && totalArea < 18000) {
    return 40 * 4;
  } else if (totalArea >= 18000 && totalArea <= 25000) {
    return 40 * 8;
  } else {
    return 0;
  }
};

const calculateExecutiveWashroom = (totalArea) => {
  if (totalArea >= 9000 && totalArea <= 25000) {
    return 60 * 2;
  } else {
    return 0;
  }
};
const calculateOther = () => {
  return 0;
};


const App = () => {
  const [totalArea, setTotalArea] = useState(0);
  const [areas, setAreas] = useState(initialAreas);
  const [areaValues, setAreaValues] = useState(initialAreaValues);
  const [variant, setVariant] = useState("large");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mdCabinSize, setMdCabinSize] = useState(initialAreaValues.md);
  const [smallCabinSize, setSmallCabinSize] = useState(areaValues.small);
  const [hrRoomSize, setHrRoomSize] = useState(areaValues.hrRoom);
  const [salesRoomSize, setSalesRoomSize] = useState(areaValues.hrRoom);
  const [financeRoomSize, setFinanceRoomSize] = useState(areaValues.financeRoom);
  const [smallCabinSeatCount, setSmallCabinSeatCount] = useState(4);
  const [hrRoomSeatCount, setHrRoomSeatCount] = useState(4);
  const [salesSeatCount, setSalesSeatCount] = useState(4);
  const [financeRoomSeatCount, setFinanceRoomSeatCount] = useState(4);
  const [totalMdCabinArea, setTotalMdCabinArea] = useState(0); // Define totalMdCabinArea

  useEffect(() => {
    const linear = calculateLinear(totalArea);
    const lType = calculateLType(totalArea);
    const md = calculateMd(totalArea);
    const manager = calculateManager(totalArea);
    const small = calculateSmall(totalArea, handleSmallCabinPeopleCountChange);
    setSmallCabinSize(small);
    const discussionRoom = calculateDiscussionRoom(totalArea);
    const interviewRoom = calculateInterviewRoom(totalArea);
    const conferenceRoom = calculateConferenceRoom(totalArea);
    const boardRoom = calculateBoardRoom(totalArea);
    const meetingRoom = calculateMeetingRoom(totalArea);
    const meetingRoomLarge = calculateMeetingRoomLarge(totalArea);
    const videoRecordingRoom = calculateVideoRecordingRoom(totalArea);
    const phoneBooth = calculatePhoneBooth(totalArea);
    const server = calculateServer(totalArea);
    const executiveWashroom = calculateExecutiveWashroom(totalArea);
    const receptionArea = calculateReceptionArea(totalArea);
    const loungeArea = calculateLoungeArea(totalArea);
    const otherArea = calculateOther(totalArea);
    setAreas((prevAreas) => ({
      ...prevAreas,
      linear: Math.round(linear / areaValues.linear),
      lType: lType / areaValues.lType,
      md: md / areaValues.md,
      manager: manager / areaValues.manager,
      small: small / areaValues.small,
      discussionRoom: discussionRoom / areaValues.discussionRoom,
      interviewRoom: interviewRoom / areaValues.interviewRoom,
      conferenceRoom: conferenceRoom / areaValues.conferenceRoom,
      boardRoom: boardRoom / areaValues.boardRoom,
      meetingRoom: meetingRoom / areaValues.meetingRoom,
      meetingRoomLarge: meetingRoomLarge / areaValues.meetingRoomLarge,
      videoRecordingRoom: videoRecordingRoom / areaValues.videoRecordingRoom,
      phoneBooth: phoneBooth / areaValues.phoneBooth,
      server: server / areaValues.server,
      executiveWashroom: executiveWashroom / areaValues.executiveWashroom,
      reception: receptionArea / areaValues.reception,
      lounge: loungeArea / areaValues.lounge,
      other: otherArea / areaValues.other,
    }));
  }, [totalArea, areaValues]);

  useEffect(() => {
    setTotalMdCabinArea(mdCabinSize * areas.md);
  }, [mdCabinSize, areas.md]);

  const updateAreas = (type, value) => {
    const newAreas = {
      ...areas,
      [type]: value
    };
    setSmallCabinSeatCount(newAreas.small * 4);
    setHrRoomSeatCount(newAreas.hrRoom * 4);
    setSalesSeatCount(newAreas.sales * 4);
    setFinanceRoomSeatCount(newAreas.financeRoom * 4);
    const builtArea = Object.keys(newAreas).reduce(
      (acc, key) => acc + newAreas[key] * areaValues[key],
      0
    );

    const freeSpace = totalArea * 0.05; // 5% of totalArea
    const usableArea = totalArea - freeSpace; // Area available for building

    if (builtArea <= usableArea) {
      setAreas(newAreas);
      setError(false);
      setShowModal(false);
    } else {
      console.log("Built area exceeds the available space, showing modal");
      setError(true);
      setShowModal(true);
    }
  };

  const handleSetTotalArea = (value) => {
    if (value >= MIN_AREA && value <= MAX_AREA) {
      setTotalArea(value);
      setError(false);
      setShowModal(false);
    } else if (value > MAX_AREA) {
      console.log("Total area exceeds the max limit, showing modal");
      setTotalArea(value);
      setError(true);      // Trigger error due to exceeding max limit
      setShowModal(true);  // Show modal if area exceeds max limit
    } else {
      setError(true);
      setShowModal(true);
    }
  };

  const resetAll = () => {
    setTotalArea(0);
    setSmallCabinSeatCount(4);
    setHrRoomSeatCount(4);
    setSalesSeatCount(4);
    setAreas(initialAreas);
    setError(false);
    setShowModal(false); // Hide modal on reset
  };

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    const newAreaValues = { ...areaValues };
    switch (newVariant) {
      case "medium":
        newAreaValues.linear = 20;
        break;
      case "xl":
        newAreaValues.linear = 29;
        break;
      case "large":
      default:
        newAreaValues.linear = 24;
        break;
    }
    setAreaValues(newAreaValues);
  };

  const builtArea = Object.keys(areas).reduce(
    (acc, key) => acc + areas[key] * areaValues[key],
    0
  );
  const availableArea = totalArea - builtArea;

  const handleMdCabinAreaChange = (newMdCabinSize) => {
    setMdCabinSize(newMdCabinSize);
  };

  const handleRoomAreaChange = (roomType, setRoomSize, areaKey) => (newCabinSize) => {
    setRoomSize(newCabinSize);
    setAreas((prevAreas) => ({
      ...prevAreas,
      [roomType]: Math.round(newCabinSize / areaValues[areaKey]),
    }));
  };

  const handleSmallCabinAreaChange = handleRoomAreaChange("small", setSmallCabinSize, "small");
  const handleHrRoomAreaChange = handleRoomAreaChange("hrRoom", setHrRoomSize, "hrRoom");
  const handleSalesRoomAreaChange = handleRoomAreaChange("sales", setSalesRoomSize, "sales");
  const handleFinanceRoomAreaChange = handleRoomAreaChange("financeRoom", setFinanceRoomSize, "financeRoom");

  const handleSeatCountChange = (setter) => (newCount) => {
    setter(newCount);
  };

  const handleSmallCabinPeopleCountChange = handleSeatCountChange(setSmallCabinSeatCount);
  const handleHrRoomSeatCountChange = handleSeatCountChange(setHrRoomSeatCount);
  const handleSalesRoomSeatCountChange = handleSeatCountChange(setSalesSeatCount);
  const handleFinanceRoomSeatCountChange = handleSeatCountChange(setFinanceRoomSeatCount);

  const hrRoomConfig = {
    seatCount: hrRoomSeatCount,
    setSeatCount: handleHrRoomSeatCountChange,
    roomSize: hrRoomSize,
    setRoomSize: handleHrRoomAreaChange,
  };

  const salesRoomConfig = {
    seatCount: salesSeatCount,
    setSeatCount: handleSalesRoomSeatCountChange,
    roomSize: salesRoomSize,
    setRoomSize: handleSalesRoomAreaChange,
  };

  const financeRoomConfig = {
    seatCount: financeRoomSeatCount,
    setSeatCount: handleFinanceRoomSeatCountChange,
    roomSize: financeRoomSize,
    setRoomSize: handleFinanceRoomAreaChange,
  };

  const smallCabinConfig = {
    seatCount: smallCabinSeatCount,
    setSeatCount: handleSmallCabinPeopleCountChange,
    roomSize: smallCabinSize,
    setRoomSize: handleSmallCabinAreaChange,
  };

  const areaInfo = {
    totalArea,
    builtArea,
  };

  return (
    <div className="container">
      <AreaInput
        setTotalArea={handleSetTotalArea}
        builtArea={builtArea}
        availableArea={availableArea}
        resetAll={resetAll}
      />
      <div className="--content">
        <Treemap
          totalArea={totalArea}
          builtArea={builtArea}
          availableArea={availableArea}
          areas={areas}
          areaValues={areaValues}
          totalMdCabinArea={totalMdCabinArea}
        />
        <div className="--sections">
          <OpenWorkspaces
            areas={areas}
            updateAreas={updateAreas}
            variant={variant}
            onVariantChange={handleVariantChange}
          />
          <Cabins
            areas={areas}
            updateAreas={updateAreas}
            mdCabinSize={mdCabinSize}
            setMdCabinSize={handleMdCabinAreaChange}
            smallCabinConfig={smallCabinConfig}
            totalArea={totalArea}
            builtArea={builtArea}
          />
          <MeetingRooms areas={areas} updateAreas={updateAreas}
            hrRoomConfig={hrRoomConfig} salesRoomConfig={salesRoomConfig}
            financeRoomConfig={financeRoomConfig} areaInfo={areaInfo}
          />
          <PublicSpaces areas={areas} updateAreas={updateAreas} />
          <SupportSpaces areas={areas} updateAreas={updateAreas} />
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Card /> {/* Ensure this Card component is being displayed properly */}
        </Modal>
      )}
      {error && (
        <div className="error">
          🚨 Oops! The area exceeded the allowed limits. Please check your input and try again!
        </div>
      )}
      <Tooltip />

    </div>
  );
};

export default App;