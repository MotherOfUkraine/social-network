import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'


describe('ProfileStatus component', () => {
    test('status from props hould be in the state', () => {
        const component = create(<ProfileStatus status={'aye'} />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('aye')
    })

    test('after creation span should be dispalayed', () => {
        const component = create(<ProfileStatus status={'aye'} />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test('after creation input should be dispalayed', () => {
        const component = create(<ProfileStatus status={'aye'} />)
        const root = component.root
        expect(() => {
            root.findByType('input')
        }).toThrow()
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status={'aye'} />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('aye')
    })

    test('callback should be called', () => {

        const callback = jest.fn()
        const component = create(<ProfileStatus status={'aye'} updateStatus={callback} />)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(callback.mock.calls.length).toBe(1)
    })
})

