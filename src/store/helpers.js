import {useContext, useEffect} from 'react';
import {PageContext} from '../contexts/PageContext';

export default function PageLoader() {
    const {pageState, setPageState} = useContext(PageContext);
    useEffect(() => {
        setPageState({...pageState, loading: false})
    }, [])
}