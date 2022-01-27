import { decrement, increment } from '@/app/features/counter/counterSlice'
import { fetchUserByUserName, useFetchUserByUserName } from '@/app/features/user/fetchUserByUserName'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '../../app/store'

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value)
  const { data, loading } = useFetchUserByUserName({ variables: { userName: 'louiso' } })
  const dispatch = useAppDispatch()

  const _handleClickFetch = () => {
    dispatch(fetchUserByUserName({ userName: 'louiso' }))
  }

  console.log('loading', loading)

  if (loading) {
    return (
      <div>
        Loading ...
      </div>
    )
  }

  console.log('data', data)

  return (
    <div>
      <div>
        <button
          type="button"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          type="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <button type="button" onClick={_handleClickFetch}>
        FETCH
      </button>
    </div>
  )
}
