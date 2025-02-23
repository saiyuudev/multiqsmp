import {
	ArrowsIn,
	ArrowsOut,
	Chat,
	SpeakerHigh,
	SpeakerX,
} from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
	onMuteChange: (mute: boolean) => void;
	onChatSelect: () => void;
	onFullscreenChange: (full: boolean) => void;
}

export const Header = ({
	onMuteChange,
	onFullscreenChange,
	onChatSelect,
}: Props) => {
	const [muted, setMuted] = useState(true);
	const [fullscreen, setFullscreen] = useState(false);

	const handleMuteChange = () => {
		setMuted((old) => !old);

		onMuteChange(!muted);
	};

	const handleFullscreenChange = () => {
		setFullscreen((old) => !old);

		onFullscreenChange(!fullscreen);
	};

	return (
		<header className="px-2 py-1 absolute top-0 left-0 rounded-br-md bg-[#302a3963] space-x-2">
			<button onClick={handleMuteChange}>
				{muted && <SpeakerX size={20} color="#fff" />}
				{!muted && <SpeakerHigh size={20} color="#fff" />}
			</button>
			<button onClick={handleFullscreenChange}>
				{fullscreen && <ArrowsIn size={20} color="#fff" />}
				{!fullscreen && <ArrowsOut size={20} color="#fff" />}
			</button>
			<button onClick={onChatSelect} className="sm:inline-block hidden">
				<Chat size={20} color="#fff" />
			</button>
		</header>
	);
};
