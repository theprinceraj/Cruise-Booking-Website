import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: "inherit",
    padding: theme.spacing(2),
}));

export default function TypographyTheme(props) {
    return (<>
        <Div>
            <a href="" target="_blank" rel="noopener noreferrer">{props.name}</a>

        </Div>
    </>
    );
}
