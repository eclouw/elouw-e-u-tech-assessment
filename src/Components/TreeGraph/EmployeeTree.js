import EmployeeTreeRootCreator from "./EmployeeTreeRootCreator";
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

function EmployeeTree({employees, nodeClick}){
    const [roots, setRoots] = useState([]);

    useEffect(()=>{
        setRoots(EmployeeTreeRootCreator(employees));
    }, [])

    useEffect(()=>{
        setRoots(EmployeeTreeRootCreator(employees));
    }, [employees])


    //Handle when the user clicks a node
    const handleNodeClick = (nodeData, e)=>{
        console.log("you clicked", nodeData);
        if (nodeClick){
            if (nodeData.emp_number){
                nodeClick(nodeData);
            }
            
        }
        
    }

    

    //Create the custom nodes that are displayed in the tree
    const customNodes = ({nodeDatum, toggleNode})=>{
        const isToggled = !nodeDatum.__rd3t.collapsed;
        return(
        <g >
            {nodeDatum.children.length > 0 ? (
                <>
                <rect
                width={200}
                height={70}
                x={-100}
                y={-35}
                fill="lightblue"
                stroke="black"
                strokeWidth={2}
                onClick={()=>handleNodeClick(nodeDatum)}
            />

            <circle
            r={15}
            cx={-100}
            cy={-35}
            fill={isToggled ? "red" : "green"}
            stroke="black"
            strokeWidth={2}
            onClick={()=>toggleNode()}/>

            <text fill="black"
            textAnchor="middle"
            fontSize={24}
            fontWeight={"normal"}
                onClick={()=>handleNodeClick(nodeDatum)}
                alignmentBaseline="middle" >
                {nodeDatum.name}
            </text>
            {nodeDatum.role_name && (
                <text fill="black"
                textAnchor="middle"
                fontSize={16}
                fontWeight="normal"
                alignmentBaseline="middle"
                y={20}
                onClick={()=>handleNodeClick(nodeDatum)}>
                    Role: {nodeDatum.role_name}
                </text>
            )}
            
            
                </>
            ): (
                <>
                <rect
                width={200}
                height={60}
                x={-100}
                y={-25}
                fill="white"
                stroke="black"
                strokeWidth={2}
                onClick={()=>handleNodeClick(nodeDatum)}
            />

            <text fill="black"
            textAnchor="middle"
            fontSize={20}
            alignmentBaseline="middle" 
            onClick={()=>handleNodeClick(nodeDatum)}>
                {nodeDatum.name}
            </text>

            {nodeDatum.role_name && (
                <text fill="black"
                textAnchor="middle"
                fontSize={16}
                fontWeight="normal"
                alignmentBaseline="middle"
                y={20}
                onClick={()=>handleNodeClick(nodeDatum)}>
                    Role: {nodeDatum.role_name}
                </text>
            )}

                </>
            )}
            
        </g>
        )
    }

    
    
    return(
        <>
            
            {roots.length  != 0 ?(
                <Tree data={roots} orientation="vertical" separation={{ siblings: 2, nonSiblings: 2 }} renderCustomNodeElement={customNodes} pathFunc="step"/>
            ):(
                <p>loading</p>
            )}
            
        

        
            
        
        </>
    )
}

export default EmployeeTree;