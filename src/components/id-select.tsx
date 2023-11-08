import { Select } from "antd"
import { SN } from "types"

type SelectProps = React.ComponentProps<typeof Select>

// 类型不是简单的后来者居上，而是寻求"最大公约数"的方式
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: SN | null | undefined,
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当isNaN(Number(value)) 为 true 的时候，代表选择默认类型
 * 当选择默认类型时，onChange 会回调 undefined
 * @param props 
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return <Select
        value={options?.length ? toNumber(value) : 0}
        onChange={value => onChange(toNumber(value) || undefined)}
        {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
