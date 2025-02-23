"use client";

// import STREAMERS from "@/streamers.json";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	ArrowRight,
	CheckSquare,
	Square,
	Swap,
	X,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Streamer } from "./Streamer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Dialog = ({
	locale,
	streams,
	streamers,
}: {
	locale: string;
	streams?: string[];
	streamers: Streamer[];
}) => {
	const t = useTranslations("modal");

	const router = useRouter();

	const [selectedStreamers, setSelectedStreamers] = useState<string[]>(
		streams || []
	);

	function handleClick(streamer: string) {
		if (selectedStreamers.includes(streamer)) {
			setSelectedStreamers((old) => old.filter((s) => s !== streamer));
		} else {
			setSelectedStreamers((old) => [...old, streamer]);
		}
	}

	return (
		<DialogPrimitive.Root>
			<DialogPrimitive.Trigger asChild>
				<button className="sm:animate-changeButtonStart bg-cold-purple-500 px-3 py-1 rounded-lg sm:rounded-r-none absolute right-1/2 translate-x-1/2 mx-auto h-fit bottom-8 sm:right-0 sm:translate-x-9 sm:hover:translate-x-0 sm:transition-transform">
					<Swap size={28} color="#fff" weight="bold" />
				</button>
			</DialogPrimitive.Trigger>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
				<DialogPrimitive.Content className="text-white w-[90%] sm:w-[75%] flex flex-col items-center px-8 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-silver-950 focus:outline-none">
					<header className="pt-8 flex justify-between w-full">
						<DialogPrimitive.Title className="text-base">
							{t("title")}
						</DialogPrimitive.Title>
						<DialogPrimitive.Close>
							<button>
								<X size={20} color="#fff" weight="bold" />
							</button>
						</DialogPrimitive.Close>
					</header>
					<main className="max-h-96 p-[2px] overflow-y-auto w-full mt-4 flex justify-center flex-row flex-wrap grid-cols-[repeat(2,_minmax(0,_6rem))] sm:grid-cols-[repeat(3,_minmax(0,_8rem))] gap-4 scrollbar pr-3">
						{streamers.map((streamer) => (
							<Streamer
								key={streamer.twitchName}
								streamer={streamer}
								onClick={handleClick}
								selected={selectedStreamers.includes(
									streamer.twitchName
								)}
							/>
						))}
					</main>
					<footer className="flex justify-between items-center mt-4 pb-4 w-full">
						<div className="space-x-2">
							<button
								className="p-1 rounded-lg hover:bg-zinc-900 transition-all"
								onClick={() => setSelectedStreamers([])}
							>
								<Square
									size={20}
									color="#f1eeee"
									weight="bold"
								/>
							</button>
							<button
								className="p-1 rounded-lg hover:bg-zinc-900 transition-all"
								onClick={() =>
									setSelectedStreamers(
										streamers.map(
											(streamer) => streamer.twitchName
										)
									)
								}
							>
								<CheckSquare
									size={20}
									color="#f1eeee"
									weight="bold"
								/>
							</button>
						</div>
						<button
							className="flex items-center gap-2 hover:bg-zinc-900 p-2 rounded-lg transition-all"
							onClick={() =>
								router.push(
									`/${locale}/${selectedStreamers.join("/")}`
								)
							}
						>
							{t("watch")}{" "}
							<ArrowRight
								size={20}
								color="#f1eeee"
								weight="bold"
							/>
						</button>
					</footer>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};
