import React, { useEffect, useState } from 'react'
import tw, { TwStyle } from 'twin.macro'
import {
  Dropdown,
  Popover,
  Modal,
  Tooltip,
  Sidebar,
  Breadcrumb,
  Select,
  Autocomplete,
  Toggle,
  Disclosure,
  RadioGroup,
  Tabs,
  Icons,
  Pagination,
} from './components'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import TransitionDemo from './components/TransitionDemo'
import ICONS from './icons'
import usePagination from './hooks/usePagination'
import { DropdownItems } from './samples/DropdownItems'
import PopoverContent from './samples/PopoverContent'
import SidebarContent from './samples/SidebarContent'
import { SelectItems } from './samples/SelectItems'
import axios from 'axios'

interface ContentType {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  UserId: number
  User: {
    name: string
    username: string
    email: string
  }
}

export default function Examples() {
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [modalShow2, setModalShow2] = useState<boolean>(false)
  const [sidebarShow, setSidebarShow] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string>('')
  const [contents, setContents] = useState<ContentType[]>([])
  const {
    page,
    pageButtons,
    pageSize,
    maxPage,
    maxRatio,
    currentRatio,
    setTotalCount,
    setPageSize,
    changePage,
    prevPage,
    nextPage,
  } = usePagination()

  useEffect(() => {
    setPageSize(5)
  }, [])

  useEffect(() => {
    getPaginationSamples(page, pageSize)
  }, [page, pageSize])

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleModalClose2 = () => {
    setModalShow2(false)
  }

  const handleSidebarClose = () => {
    setSidebarShow(false)
  }

  const getPaginationSamples = async (page: number, pageSize: number) => {
    const result = await axios.get('https://koreanjson.com/comments')
    setTotalCount(result?.data?.length)
    const paged = result?.data?.slice((page - 1) * pageSize, page * pageSize)
    setContents(paged)
  }

  return (
    <Container>
      <Dropdown
        items={DropdownItems}
        placement="bottom-start"
        menuItemStyle={tw`flex rounded-md items-center w-full p-2 text-sm cursor-pointer text-gray-900 hover:(bg-amber-500 text-white)`}
      >
        <div tw="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>hi</span>
          <ChevronDownIcon tw="w-5 h-5 ml-2" />
        </div>
      </Dropdown>

      <Popover
        placement="bottom-start"
        content={<PopoverContent />}
        offset={[8, 12]}
      >
        <button tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Open Popover</span>
        </button>
      </Popover>
      <Tooltip
        content="tooltip!"
        trigger="hover"
        placement="bottom"
        offset={[0, 12]}
      >
        <button tw="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
          <span>Tooltip</span>
        </button>
      </Tooltip>

      <div>
        <button
          type="button"
          tw="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setModalShow(true)}
        >
          Modal On
        </button>
        <button
          type="button"
          tw="px-4 py-2 ml-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setModalShow2(true)}
        >
          Full Modal On
        </button>
        <Modal
          title="Payment successful"
          open={modalShow}
          onClose={handleModalClose}
          width="400px"
          centered
        >
          <div tw="flex flex-col gap-2">
            <div>test1</div>
            <div>test2</div>
            <button
              tw="border border-gray-400 rounded-md cursor-pointer mt-1.5 py-1 hover:(border-blue-500 text-blue-500)"
              onClick={() => setModalShow(false)}
            >
              close
            </button>
          </div>
        </Modal>
        <Modal
          title="Payment successful"
          open={modalShow2}
          onClose={handleModalClose2}
          close
          fullScreens={['mobile', 'desktop']}
        >
          <div tw="flex flex-col gap-2">
            <div>test1</div>
            <div>test2</div>
            <button
              tw="border border-gray-400 rounded-md cursor-pointer mt-1.5 py-1 hover:(border-blue-500 text-blue-500)"
              onClick={() => setModalShow2(false)}
            >
              close
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <button
          type="button"
          tw="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)"
          onClick={() => setSidebarShow(true)}
        >
          Sidebar On
        </button>
        <Sidebar
          open={sidebarShow}
          onClose={handleSidebarClose}
          placement="left"
        >
          <SidebarContent setSidebarShow={setSidebarShow} />
        </Sidebar>
      </div>

      <div tw="w-48 h-10">
        <Select
          items={SelectItems}
          onChange={value => {
            setSelectValue(value)
          }}
          value={selectValue}
          showArrow
          arrow={
            <div tw="w-5 h-5">
              <ICONS.Logo />
            </div>
          }
          placeholder="??????????????? ???????????????"
        />
      </div>

      <Breadcrumb
        items={[
          {
            name: '???',
            url: '/',
          },
          {
            name: '??????',
            url: '',
          },
          {
            name: '??? ??????',
            url: '/my-inform',
            disabled: true,
          },
          {
            name: '??????',
            url: '/my-inform/edit',
          },
          {
            name: '??????',
            url: '/my-inform/edit/withdraw',
          },
        ]}
      />

      <div tw="flex flex-col gap-4">
        {contents?.map(content => (
          <div tw="p-4 border border-gray-600 rounded-lg">
            <div tw="mb-1">
              <span tw="font-bold">{content.User?.username}</span>
              <span tw="text-gray-500 text-sm ml-2">
                {new Date(content.updatedAt).toLocaleString()}
              </span>
            </div>
            <div>{content.content}</div>
          </div>
        ))}
        <Pagination
          page={page}
          pageButtons={pageButtons}
          maxPage={maxPage}
          maxRatio={maxRatio}
          currentRatio={currentRatio}
          changePage={changePage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>

      {/* <Select
        items={[
          { name: 'Wade Cooper' },
          { name: 'Arlene Mccoy' },
          { name: 'Devon Webb' },
          { name: 'Tom Cook' },
          { name: 'Tanya Fox' },
          { name: 'Hellen Schmidt' },
        ]}
      />

      <Autocomplete
        items={[
          { name: 'Wade Cooper' },
          { name: 'Arlene Mccoy' },
          { name: 'Devon Webb' },
          { name: 'Tom Cook' },
          { name: 'Tanya Fox' },
          { name: 'Hellen Schmidt' },
        ]}
      />

      <Toggle
        label="Enable notifications"
        description="For extra noise"
        groupProps={{}}
        labelProps={{}}
        descriptionProps={{}}
        switchProps={{}}
      />

      <Disclosure
        items={[
          {
            heading: 'What is your refund policy?',
            content:
              'If you???re unhappy with your purchase for any reason, email us within 90 days and we???ll refund you in full, no questions asked.',
          },
          {
            heading: 'Do you offer technical support?',
            content: 'No.',
          },
        ]}
      />

      <RadioGroup
        screenReaderLabel="Server size"
        items={[
          {
            name: 'Startup',
            ram: '12GB',
            cpus: '6 CPUs',
            disk: '160 GB SSD disk',
          },
          {
            name: 'Business',
            ram: '16GB',
            cpus: '8 CPUs',
            disk: '512 GB SSD disk',
          },
          {
            name: 'Enterprise',
            ram: '32GB',
            cpus: '12 CPUs',
            disk: '1024 GB SSD disk',
          },
        ]}
      />

      <TransitionDemo />

      <Tabs
        items={{
          Recent: [
            {
              id: 1,
              title: 'Does drinking coffee make you smarter?',
              date: '5h ago',
              commentCount: 5,
              shareCount: 2,
            },
            {
              id: 2,
              title: "So you've bought coffee... now what?",
              date: '2h ago',
              commentCount: 3,
              shareCount: 2,
            },
          ],
          Popular: [
            {
              id: 1,
              title: 'Is tech making coffee better or worse?',
              date: 'Jan 7',
              commentCount: 29,
              shareCount: 16,
            },
            {
              id: 2,
              title: 'The most innovative things happening in coffee',
              date: 'Mar 19',
              commentCount: 24,
              shareCount: 12,
            },
          ],
          Trending: [
            {
              id: 1,
              title:
                'Ask Me Anything: 10 answers to your questions about coffee',
              date: '2d ago',
              commentCount: 9,
              shareCount: 5,
            },
            {
              id: 2,
              title: "The worst advice we've ever heard about coffee",
              date: '4d ago',
              commentCount: 1,
              shareCount: 2,
            },
          ],
        }}
        tabGroupProps={{}}
      /> */}
    </Container>
  )
}

/**
 * Usage example ends here =====================================================
 */

const exampleData: [string, TwStyle, string][] = [
  [
    'Dropdown',
    tw`to-indigo-500 from-purple-500`,
    '?????? ?????? ?????? ???????????? ?????? ?????? ???, ?????? ?????????????????? ?????? ?????? ?????? ????????? ???????????? ????????? ?????? ???????????? popover??? ??????',
  ],
  [
    'Popover',
    tw`from-sky-400 to-indigo-500`,
    '?????? ?????? ?????? ????????? ???????????? ?????? ?????? ??????, ?????? ????????? ?????? ????????? ??????????????? ?????????????????? ?????????',
  ],
  [
    'Tooltip',
    tw`from-orange-600 to-yellow-600`,
    '????????? ??????(hover/click)??? ???????????? ????????? ????????? ????????? ?????????, ????????? ????????? ?????????????????? ??????',
  ],
  [
    'Modal',
    tw`from-emerald-600 to-teal-900`,
    '??? ???????????? ???????????? ?????? ?????? ????????? ?????? ????????? ????????? ?????????????????? ??????????????? ??????',
  ],
  [
    'Sidebar',
    tw`from-cyan-600 to-blue-600`,
    '????????? ????????? ???????????? ?????????????????? ??????',
  ],
  [
    'Select (Autocomplete)',
    tw`from-pink-500 to-rose-500`,
    'Select ????????? ????????? ??????',
  ],
  [
    'Breadcrumb',
    tw`from-white to-white`,
    '???????????? ????????? ?????????????????? ?????? ?????? ?????? ???????????? ????????? ?????????',
  ],
  [
    'Pagination',
    tw`from-white to-white`,
    '???????????? ?????? ???????????? ???????????? ?????? ??? ????????? ??? ????????? ?????????????????? ??????',
  ],
  // ['Listbox (Select)', tw`from-amber-300 to-orange-500`],
  // ['Switch (Toggle)', tw`from-green-400 to-cyan-500`],
  // ['Disclosure', tw`from-fuchsia-500 to-purple-600`],
  // ['Radio Group', tw`from-cyan-400 to-sky-500`],
  // ['Transition', tw`from-pink-500 to-rose-500`],
  // ['Tabs', tw`from-sky-400 to-blue-600`],
]

type ExampleProps = {
  className?: string
  children: React.ReactNode
  index: number
}

function Example({ className, children, index }: ExampleProps) {
  const [heading, gradientStyles, description] = exampleData[index] || []
  return (
    <div css={[tw`space-y-4`, gradientStyles]}>
      <h2 tw="font-extrabold text-3xl">{heading}</h2>
      <h3 tw="text-xl font-bold">When To use</h3>
      <p tw="!mb-6">{description}</p>
      <div
        tw="p-10 relative rounded-xl bg-gradient-to-r shadow-lg text-black"
        {...{ className }}
      >
        {children}
      </div>
    </div>
  )
}

function Container({ children }: { children: React.ReactNode[] }) {
  if (!children) return null

  return (
    <div tw="flex flex-col items-center py-36">
      <div tw="w-full max-w-[700px] space-y-20">
        {children.map((item, index) => (
          <Example key={index} index={index}>
            {item}
          </Example>
        ))}
      </div>
    </div>
  )
}
