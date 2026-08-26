export const Logs = ({logs}) => {

    if (logs.length == 0) {

        return null

    }

  return (
    <div>
        

        {logs.map((element, index) => {

            return <p key={index} className="text-center odd:text-green-500"> {`${index}. ${element}`} </p>

          })}  

    </div>
  )
}
