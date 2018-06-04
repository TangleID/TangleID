import {
	CALL_API,
	CREATE_CLAIM_REQUEST,
	CREATE_CLAIM_FAILURE,
	CREATE_CLAIM_SUCCESS,
} from '../constants'
import { transformParams } from './_helper'

const createMamMessage = (params) => ({
	[CALL_API]: {
		types: [
			CREATE_CLAIM_REQUEST,
			CREATE_CLAIM_SUCCESS,
			CREATE_CLAIM_FAILURE,
		],
		method: 'POST',
		params: {
			body: {
                          params: {
                            sender: params.sender,
                            receiver: params.receiver
                          },
                          packet: params.msg
                        }
		},
		host: process.env.HOST_API,
		endpoint: '/mamSend'
	}
})

export default createMamMessage
