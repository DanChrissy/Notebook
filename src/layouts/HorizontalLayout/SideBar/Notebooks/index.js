import React from "react";
import styled from "styled-components";
import Notebook from "../../../../components/Notebook";

const Notebooks = ({ notebooks = [], handleSelectNotebook}) => {
    return (
        <NotebooksWrapper>
            <NotebooksContainer>
                {notebooks.map((notebook,index) => {
                    return (
                        <Notebook 
                            key={index} 
                            name={notebook?.name}
                            handleSelectNotebook={() => handleSelectNotebook(notebook?.id)}
                        />
                    )
                })}
            </NotebooksContainer>
        </NotebooksWrapper>
    )
}

export default Notebooks;

const NotebooksWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const NotebooksContainer = styled.div`
    display: flex;
    flex-direction: column;
`;