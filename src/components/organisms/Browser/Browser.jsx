import { useEffect, useRef } from "react";
import { Input, Row } from "antd";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { usePortStore } from "../../../store/portStore";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser = ({ projectId }) => {

    const browserRef = useRef(null);
    const { port, setPort } = usePortStore();

    const { editorSocket } = useEditorSocketStore();

    useEffect(() => {
        if(!port && editorSocket && projectId) {
            editorSocket.emit("getPort", { containerName: projectId });
        }
    }, [port, editorSocket, projectId]);

    // Handle port response and container ready
    useEffect(() => {
        if(!editorSocket) return;
        
        const handlePortResponse = ({ port: receivedPort }) => {
            if(receivedPort) {
                setPort(receivedPort);
            }
        };

        const handleContainerReady = ({ port: receivedPort }) => {
            if(receivedPort) {
                setPort(receivedPort);
            }
        };

        editorSocket.on("portResponse", handlePortResponse);
        editorSocket.on("containerReady", handleContainerReady);
        
        return () => {
            editorSocket.off("portResponse", handlePortResponse);
            editorSocket.off("containerReady", handleContainerReady);
        };
    }, [editorSocket, setPort]);

    // Auto-refresh iframe on backend file change events
    useEffect(() => {
        if(!editorSocket) return;
        
        const refresh = () => {
            if(browserRef.current && port) {
                // Force refresh by adding timestamp to URL
                const baseUrl = `http://localhost:${port}`;
                browserRef.current.src = `${baseUrl}?t=${Date.now()}`;
            }
        };
        
        const debounced = (() => {
            let t = null;
            return () => {
                clearTimeout(t);
                t = setTimeout(refresh, 500); // Increased debounce time for better performance
            };
        })();

        editorSocket.on("file-change", debounced);
        editorSocket.on("fileChange", debounced);
        editorSocket.on("writeFileSuccess", debounced); // Also refresh on successful file writes
        
        return () => {
            editorSocket.off?.("file-change", debounced);
            editorSocket.off?.("fileChange", debounced);
            editorSocket.off?.("writeFileSuccess", debounced);
        };
    }, [editorSocket, port]);

    function handleRefresh() {
        if(browserRef.current && port) {
            const baseUrl = `http://localhost:${port}`;
            browserRef.current.src = `${baseUrl}?t=${Date.now()}`;
        }
    }

    return (
        <Row
            style={{
                backgroundColor: "#22212b"
            }}
        >
            <Input 
                style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35",
                }}
                prefix={<ReloadOutlined onClick={handleRefresh} />}
                value={port ? `http://localhost:${port}` : ""}
            />

            <iframe 
                ref={browserRef}
                src={port ? `http://localhost:${port}` : "about:blank"}
                style={{
                    width: "100%",
                    height: "95vh",
                    border: "none"
                }}
            />

        </Row>
    )

}