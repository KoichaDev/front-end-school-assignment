import { printErrorMessage } from '../../helpers/errorMessage.js';
import { URL_IMAGE_PATH } from '../../constants/imageUrl.js';

export function createOutputGameMessage(payloadGameMessage) {
	const {
		nodeOutputGameMessage,
		message = '',
		imageCharacterName,
		isVisibleDangerTextColor = false,
	} = payloadGameMessage;

	if (message === '') {
		printErrorMessage('😡 Requires output message!');
	}

	if (!imageCharacterName) {
		printErrorMessage('😡 missing image name of the character!');
	}

	nodeOutputGameMessage.innerHTML += _setOutputMarkupMessage(
		message,
		imageCharacterName,
		isVisibleDangerTextColor
	);
}
function _setOutputMarkupMessage(message, imageCharacterName, isVisibleDangerTextColor = false) {
	return `
        <div class="output-div__game-message">
            <img src="${URL_IMAGE_PATH}/${imageCharacterName}.png" />
             <p class="${isVisibleDangerTextColor ? 'text-danger' : null}">${message}</p>
        </div>
        `;
}
