import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Pallete from "../components/pallette";
import Draggable from "../utilities/draggable";
import {
  Diagram,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
} from "@syncfusion/ej2-react-diagrams";

const Room = () => {
  const auth = useSelector((s) => s.auth);
  const params = useParams();
  // eslint-disable-next-line
  const id = params.id;
  const history = useHistory();
  let globalState = useSelector((state) => state);
  useEffect(() => {
    console.log(globalState);
  }, [globalState]);
  useEffect(() => {
    if (!auth) {
      history.push("/signin");
    }
  }, [auth, history]);

  let nodes = [
    {
      id: "Start",
      width: 140,
      height: 50,
      offsetX: 300,
      offsetY: 100,
      annotations: [
        {
          id: "label2",
          content: "Start2",
        },
      ],
      shape: {
        type: "Flow",
        shape: "Terminator",
      },
    },
    {
      id: "Init",
      width: 140,
      height: 50,
      offsetX: 300,
      offsetY: 300,
      shape: {
        type: "Flow",
        shape: "Process",
      },
      annotations: [
        {
          content: "var i = 0;",
        },
      ],
    },
    {
      id: "Start1",
      width: 140,
      height: 50,
      offsetX: 300,
      offsetY: 200,
      annotations: [
        {
          id: "label1",
          content: "Start",
        },
      ],
      shape: {
        type: "Flow",
        shape: "Decision",
      },
    },
  ];

  let connectors = [
    {
      // Name of the connector
      id: "connector1",
      style: {
        strokeColor: "#6BA5D7",
        fill: "#6BA5D7",
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: "#6BA5D7",
          strokeColor: "#6BA5D7",
        },
      },
      // ID of the source and target nodes
      sourceID: "Start",
      targetID: "Init",
      type: "Orthogonal",
    },
    {
      // Name of the connector
      id: "connector2",
      style: {
        strokeColor: "#6BA5D7",
        fill: "#6BA5D7",
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: "#6BA5D7",
          strokeColor: "#6BA5D7",
        },
      },
      // ID of the source and target nodes
      sourceID: "Init",
      targetID: "Start1",
      type: "Orthogonal",
    },
  ];

  return !auth ? (
    <div className="w-screen h-screen flex justify-center items-center text-center text-4xl text-purple-600">
      Redirecting...
    </div>
  ) : (
    <div className="flex h-screen w-screen">
      <div className="h-full w-3/4 shadow-inner flex flex-col justify-center bg-gray-300">
        <DiagramComponent
          id="diagram"
          width={"100%"}
          height={"100%"}
          nodes={globalState.shapes}
          connectors={connectors}
          onChange={console.log}
          // Defines the default properties for the node
          getNodeDefaults={(node) => {
            node.height = 100;
            node.width = 100;
            node.style.fill = "white";
            node.style.strokeColor = "purple";
            console.log(node.offsetX, node.offsetY);
            return node;
          }}
        />
        <Pallete />
      </div>
      <div className="h-full w-1/4 bg-purple-600 flex flex-wrap"></div>
    </div>
  );
};

export default Room;
