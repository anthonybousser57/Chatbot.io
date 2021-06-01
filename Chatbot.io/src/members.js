import React from 'react';

class members {

    MemberList = () => (
        <ul>
            {list.map(item => (
                <li key={item.id}>
                    <div>{item.name}</div>
                </li>
            ))}
        </ul>
    );
}

export default MemberList;
