import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';
export default function MuscleGroups(){
    const data: IExerciseData[] = [
        { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
        { name: 'Push Ups', muscles: ['chest'] },
      ];

    return (
        <div>
            <Model
                data={data}
                style={{ width: '8rem', marginBottom: '2rem' }}
                highlightedColors={['rgb(239 68 68)', 'rgb(185 28 28)']}
            ></Model>
        </div>
    )
}