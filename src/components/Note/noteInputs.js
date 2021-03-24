import Input from '../Input';

export function HeaderInput({value = "", onChange, ...defaultProps}) {
    return (
        <Input
            type="text"
            onChange={onChange}
            value={value}
            style={{
                height: 'max-content',
                fontSize:' var(--font-40)',
                fontWeight: '600',
                padding: 0,
                border: 'none',
                background: 'transparent'

            }}
            {...defaultProps}
        />
    )
};

export function SubHeader({value, onChange, ...defaultProps}) {
    return (
        <Input
            type="text"
            onChange={onChange}
            value={value}
            style={{
                height: 'max-content',
                fontSize:' var(--font-28)',
                fontWeight: '500',
                padding: 0,
                border: 'none',
                background: 'transparent'

            }}
            {...defaultProps}
        />
    )
}

export function MuliLineInput({value, onChange, rows = 2, styleProps, ...defaultProps}) {
    return (
        <Input
            multiLine
            rows = {rows}
            value={value}
            onChange={onChange}
            style={{
                fontSize: 'var(--font-20)',
                padding: 0,
                border: 'none',
                background: 'transparent',
                ...styleProps
            }}
            {...defaultProps}
        />
    )
}