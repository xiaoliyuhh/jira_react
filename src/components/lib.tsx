import styled from '@emotion/styled'

export const Row = styled.div<{
    gap?: number | boolean,
    butween?: boolean,
    marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.butween ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom + 'rem'};
  > * {
    /* 直接子元素强制控制样式 */
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`
