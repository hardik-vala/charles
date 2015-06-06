#!/usr/bin/env python

"""
Converts annotated entities in an .ann file to brat's internal .json format.
"""

import json
import os
import sys


if __name__ == "__main__":
	try:
		in_txtpath = sys.argv[1]
	except IndexError:
		sys.exit("ERROR: Expected .txt file path as first argument.")

	try:
		in_annpath = sys.argv[2]
	except IndexError:
		sys.exit("ERROR: Expected corresponding .ann file path as second "
			"argument.")

	parent_dirpath = os.path.split(in_annpath)[0]
	in_fname_noext = os.path.split(os.path.splitext(in_annpath)[0])[1]
	out_path = os.path.join(parent_dirpath, in_fname_noext + ".json")

	output = {"text": None, "entities": []}

	with open(in_txtpath) as txtfile:
		output["text"] = txtfile.read()

	with open(in_annpath) as in_file:			
		for line in in_file:
			col_entries = line.split("\t")
			sub_entries = col_entries[1].split()

			ann_id = col_entries[0]
			tag = "ALIAS"
			start_char_offset = int(sub_entries[1]) - 1
			if ";" in sub_entries[2]:
				end_char_offset = int(sub_entries[3])
			else:
				end_char_offset = int(sub_entries[2])
			
			output["entities"].append([ann_id, tag, [[start_char_offset, end_char_offset]]])

	with open(out_path, "w") as out_file:
		out_file.write(json.dumps(output, indent=4, sort_keys=True))
