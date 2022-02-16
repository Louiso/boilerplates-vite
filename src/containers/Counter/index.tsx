export default function Counter() {
  console.log('log')
  return (
    <div>
      Counter
    </div>
  )
  // const count = useAppSelector((state: RootState) => state.counter.value)
  // const { data, loading } = useFetchUserByUserName({ variables: { userName: 'louiso' } })
  // const [clientFetchUserByUserName, fetchResult] = useClientFetchUserByUserName()
  // const dispatch = useAppDispatch()

  // const _handleClickFetch = async () => {
  //   const response = await clientFetchUserByUserName({ variables: { userName: 'ghondar' } })
  //   console.log('response222222', response)
  // }

  // if (loading) {
  //   return (
  //     <div>
  //       Loading ...
  //     </div>
  //   )
  // }

  // console.log('data', data)
  // console.log('loading', loading)
  // console.log('fetchResult', fetchResult)

  // return (
  //   <div>
  //     <div>
  //       <button
  //         type="button"
  //         aria-label="Increment value"
  //         onClick={() => dispatch(increment())}
  //       >
  //         Increment
  //       </button>
  //       <span>{count}</span>
  //       <button
  //         type="button"
  //         aria-label="Decrement value"
  //         onClick={() => dispatch(decrement())}
  //       >
  //         Decrement
  //       </button>
  //     </div>

  //     <button type="button" onClick={_handleClickFetch}>
  //       FETCH
  //     </button>
  //   </div>
  // )
}
