import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Pallete from "../components/pallette";
import { DiagramComponent } from "@syncfusion/ej2-react-diagrams";
import { addConnectors, addShapes } from "../redux/actions/actions";

const Room = () => {
  const auth = useSelector((s) => s.auth);
  const params = useParams();
  // eslint-disable-next-line
  const id = params.id;
  const history = useHistory();
  let globalState = useSelector((state) => state);
  let dispatch = useDispatch();
  useEffect(() => {
    if (!auth) {
      history.push("/signin");
    }
  }, [auth, history]);

  return !auth ? (
    <div className="w-screen h-screen flex justify-center items-center text-center text-4xl text-purple-600">
      Redirecting...
    </div>
  ) : (
    <div className="flex h-screen w-screen">
      <div className="h-full w-3/4 shadow-inner flex flex-col justify-center bg-gray-300">
        <DiagramComponent
          positionChange={(node) => {
            let shapes = globalState.shapes;
            for (let i = 0; i < shapes.length; i++) {
              let n = shapes[i];
              if (n.id === node.source.id) {
                shapes[i].offsetX = node.newValue.offsetX;
                shapes[i].offsetY = node.newValue.offsetY;
              }
            }
            dispatch(addShapes(shapes));
          }}
          id="diagram"
          width={"100%"}
          height={"100%"}
          nodes={globalState.shapes}
          connectionChange={(connector) => {
            let connects = globalState.connectors;
            if (connector.newValue.nodeId !== "") {
              for (let i = 0; i < connects.length; i++) {
                const c = connects[i];
                // let sourceChanged = null;
                if (c.id === connector.connector.id) {
                  if (c.sourceID !== connector.connector.sourceID) {
                    c.sourceID = connector.connector.sourceID;
                  } else if (c.targetID !== connector.connector.targetID) {
                    c.targetID = connector.connector.targetID;
                  }
                }
              }
              dispatch(addConnectors(connects));
            }
          }}
          connectors={globalState.connectors}
          // Defines the default properties for the node
          getNodeDefaults={(node) => {
            node.height = 100;
            node.width = 100;
            node.style.fill = "white";
            node.style.strokeColor = "purple";
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
