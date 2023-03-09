import React, { ReactNode, useState } from 'react'
import styled from '@emotion/styled'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface DashboardBlockProps {
  title: string
  children: ReactNode | ReactNode[]
}

const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const BlockBody = styled.div<{ folded: boolean }>`
  height: ${(props) => (props.folded ? '0px' : 'auto')};
  transition: height;
  overflow: hidden;
`

const FoldToggle = styled.div`
  > svg {
    cursor: pointer;
    width: 24px;
  }
`

function DashboardBlock(props: DashboardBlockProps) {
  const { title, children } = props
  const [folded, setFolded] = useState(false)
  return (
    <div>
      <BlockHeader>
        {title}
        <FoldToggle onClick={() => setFolded(!folded)}>
          {folded && <ChevronUpIcon />}
          {!folded && <ChevronDownIcon />}
        </FoldToggle>
      </BlockHeader>
      <BlockBody folded={folded}>{children}</BlockBody>
    </div>
  )
}

export { DashboardBlock }
