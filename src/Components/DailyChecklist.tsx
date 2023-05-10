import CheckIcon from '@mui/icons-material/Check';
export default function DailyChecklist(props:any){
    console.log(props.activities);
    var completedCount = props.activities.reduce(function(count:any, activity:any) {
        return count + (activity.completed === true);
    }, 0);
    
    console.log(completedCount);
    return (
        <div className="py-6 px-20">
        <h3 className="font-bold text-2xl">Today's Activities ({completedCount}/4)</h3>
        <div className="flex h-[16vh] my-4 gap-2">
            {props.activities.map((activity:any) => {
                console.log(activity);
                return (
                    <div className="flex flex-col h-full text-center grow max-w-[20vh] bg-white p-2 rounded-lg drop-shadow-lg items-center">
                        <div className={`w-5 h-5 text-base self-end ${activity.completed? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-between items-center`}>
                            {activity.completed && <CheckIcon sx={{fontSize:'1rem', margin:'auto'}}/>}
                        </div>
                        <h2 className='m-auto font-semibold'>{activity.description}</h2>
                     </div>
                )
            })}
        </div>
    </div>
    )
}