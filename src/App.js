import React, {useState} from 'react';
import {Slider, Handles, Tracks, Rail, Ticks} from 'react-compound-slider'


const sliderStyle = {  // Give the slider some width
    position: 'relative',
    top: '20px',
    margin: '10px auto',
    width: '80%',
    height: 80,
    /*border: '1px solid steelblue',*/
}

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 20,
    marginTop: 28,
    borderRadius: 5,
    backgroundColor: '#ccc',
}

const Handle = ({handle: {id, value, percent}, getHandleProps}) => {
    return (
        <div
            style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: -5,
                marginTop: 25,
                zIndex: 2,
                width: 10,
                height: 30,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '15%',
                boxShadow: '-1px 2px 9px -3px rgba(0,0,0,0.8)',
                backgroundColor: '#9CBCF8',
                color: '#333',
            }}
            {...getHandleProps(id)}
        >
            <div style={{fontFamily: 'Roboto', fontSize: 11, marginTop: -35}}>
                {value}
            </div>
        </div>
    )
}

const Track = ({source, target, getTrackProps,first}) => {
    return (
        <div
            style={{
                position: 'absolute',
                height: 20,
                zIndex: 1,
                marginTop: 28,
                backgroundColor: first ? '#0C2960' : '#276EF1', /*#546C91*/
                borderRadius: 5,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
        />
    )
}

const Tick = ({tick, count}) => {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    marginTop: 52,
                    marginLeft: -0.5,
                    width: 1,
                    height: 8,
                    backgroundColor: 'silver',
                    left: `${tick.percent}%`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    marginTop: 60,
                    fontSize: 10,
                    textAlign: 'center',
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${tick.percent}%`,
                }}
            >
                {tick.value}
            </div>
        </div>
    )
}

const App = () => {


    const [values, setValues] = useState([30, 40]);
    const [update, setUpdate] = useState([30, 40]);


    const onChange = paraValues => {
        let updatedVal = 0;
        if (values[0] !== paraValues[0]) {
            updatedVal = paraValues[0] - values[0];
            if (paraValues[1] + updatedVal < 100) {
                let x = [paraValues[0], paraValues[1] + updatedVal];
                return setValues(x);
            }
            else if (paraValues[1] === 100){
              return  setValues([paraValues[0],100])
            }
        }
        return setValues(paraValues);


    }

    const onUpdate = paraValues => { // a note : updating the values state from onUpdate will cause a memory
        // stackOverflow
        if (paraValues[0] !== values[0]) {
            let updatedVal = paraValues[0] - values[0];
            if (paraValues[1] + updatedVal <= 100) {
                return setUpdate(paraValues);
            } else if (paraValues[1] !== 100) {
                let diff = 100 - values[1];
                let x = [paraValues[0] + diff, paraValues[1]+diff];
                return setUpdate(x);
            } else return setUpdate(values);
        } else {
            return setUpdate(paraValues);
        }

    }


    return (
        <div>

            <Slider
                rootStyle={sliderStyle}
                domain={[0, 100]}
                values={values}
                onChange={onChange}
                onUpdate={onUpdate}
                step={1}
                mode={3}

            >
                <Rail>
                    {({getRailProps}) => (
                        <div style={railStyle} {...getRailProps()} />
                    )}
                </Rail>

                <Handles>
                    {({handles, activeHandleID, getHandleProps}) => (
                        <div className="slider-handles">
                            {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    isActive={handle.id === activeHandleID}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>

                <Tracks left right={false}>
                    {({tracks, getTrackProps}) => (
                        <div className="slider-tracks">
                            {tracks.map(({id, source, target}) => {
                                if(id ==='$-$$-0')
                                    return(<Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                    first
                                />)
                                else return(<Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />)


                            }
                            )}
                        </div>
                    )}
                </Tracks>

                <Ticks values={[0, 25, 50, 75, 100]}>
                    {({ticks}) => (
                        <div className="slider-ticks">
                            {ticks.map(tick => (
                                <Tick key={tick.id} tick={tick} count={ticks.length}/>
                            ))}
                        </div>
                    )}
                </Ticks>


            </Slider>
            <p style={{fontSize: '2em', textAlign: 'center', marginTop: '20px'}}>
                Stock : {values[0]}% <br/>
                Administraion : {values[1] - values[0]}% <br/>
                FreeSpace : {100 - values[1]}%

            </p>

        </div>

    );
}

export default App;
