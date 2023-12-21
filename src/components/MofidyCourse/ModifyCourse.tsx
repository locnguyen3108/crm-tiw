import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import englishClassApi from '~/apis/englishClass.api'

interface Props {
  isOpen: boolean
  onClose: () => void
  course_id: number
  teacher: string
  room: number
}
export type ModifyType = Omit<Props, 'isOpen' | 'onClose'>
export default function ModifyCourse({ isOpen, onClose, course_id, teacher, room }: Props) {
  const modalRoot = document.getElementById('root') as HTMLElement
  function onFinish(values: ModifyType): void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createClassMutation = useMutation({
      mutationFn: (body: ModifyType) => englishClassApi.modifyClass(body)
    })
    createClassMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success('Cập nhật khóa học thành công!')
        setTimeout(() => onClose(), 1000)
        console.log(data)
        console.log(values)
      },
      onError: (error) => {
        toast.error('Cập nhật khóa học không thành công ')
        setTimeout(() => onClose(), 1000)
        console.log(error)
        console.log(values)
      }
    })
  }
  function onFinishFailed(errorInfo: any): void {
    console.log(errorInfo)
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal-content w-1/4'>
            <div className='relative z-0 w-full mb-6 group flex-col justify-center'>
              <Form
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 15000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                rootClassName='pt-4 h-full w-full'
              >
                <Form.Item<ModifyType>
                  label='Mã lớp học:'
                  name='course_id'
                  initialValue={course_id}
                  rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item<ModifyType>
                  label='Giáo viên:'
                  name='teacher'
                  rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
                  initialValue={teacher}
                >
                  <Input />
                </Form.Item>
                <Form.Item<ModifyType>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng điền phòng học!' }]}
                  initialValue={room}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
                    Submit
                  </Button>{' '}
                  <Button type='primary' rootClassName='bg-cyan-200' onClick={() => onClose()} danger>
                    Close
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>,
        modalRoot
      )
    : null
}