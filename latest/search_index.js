var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#PowerModels.jl-Documentation-1",
    "page": "Home",
    "title": "PowerModels.jl Documentation",
    "category": "section",
    "text": "CurrentModule = PowerModels"
},

{
    "location": "index.html#Overview-1",
    "page": "Home",
    "title": "Overview",
    "category": "section",
    "text": "PowerModels.jl is a Julia/JuMP package for Steady-State Power Network Optimization. It provides utilities for parsing and modifying network data (see PowerModels Data Format for details), and is designed to enable computational evaluation of emerging power network formulations and algorithms in a common platform.The code is engineered to decouple Problem Specifications (e.g. Power Flow, Optimal Power Flow, ...) from Network Formulations (e.g. AC, DC-approximation, SOC-relaxation, ...). This enables the definition of a wide variety of power network formulations and their comparison on common problem specifications."
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "The latest stable release of PowerModels can be installed using the Julia package manager withPkg.add(\"PowerModels\")For the current development version, \"checkout\" this package withPkg.checkout(\"PowerModels\")At least one solver is required for running PowerModels.  The open-source solver Ipopt is recommended, as it is extremely fast, and can be used to solve a wide variety of the problems and network formulations provided in PowerModels.  The Ipopt solver can be installed via the package manager withPkg.add(\"Ipopt\")Test that the package works by runningPkg.test(\"PowerModels\")"
},

{
    "location": "quickguide.html#",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "quickguide.html#Quick-Guide-1",
    "page": "Getting Started",
    "title": "Quick Guide",
    "category": "section",
    "text": "Once PowerModels is installed, Ipopt is installed, and a network data file (e.g. \"nesta_case3_lmbd.m\") has been acquired, an AC Optimal Power Flow can be executed withusing PowerModels\nusing Ipopt\n\nrun_ac_opf(\"nesta_case3_lmbd.m\", IpoptSolver())Similarly, a DC Optimal Power Flow can be executed withrun_dc_opf(\"nesta_case3_lmbd.m\", IpoptSolver())"
},

{
    "location": "quickguide.html#Providing-a-Different-Formulation-1",
    "page": "Getting Started",
    "title": "Providing a Different Formulation",
    "category": "section",
    "text": "In fact, \"run_ac_opf\" and \"run_dc_opf\" are shorthands for a more general formulation-independent OPF execution, \"run_opf\".  For example, run_ac_opf is equivalent torun_opf(\"nesta_case3_lmbd.m\", ACPPowerModel, IpoptSolver())where \"ACPPowerModel\" indicates an AC formulation in polar coordinates.  This more generic run_opf() allows one to solve an OPF problem with any power network formulation implemented in PowerModels.  For example, an SOC Optimal Power Flow can be run withrun_opf(\"nesta_case3_lmbd.m\", SOCWRPowerModel, IpoptSolver())"
},

{
    "location": "quickguide.html#Modifying-Network-Data-1",
    "page": "Getting Started",
    "title": "Modifying Network Data",
    "category": "section",
    "text": "The following example demonstrates one way to perform multiple PowerModels solves while modify the network data in Julia,network_data = PowerModels.parse_file(\"nesta_case3_lmbd.m\")\n\nrun_opf(network_data, ACPPowerModel, IpoptSolver())\n\nnetwork_data[\"bus\"][\"3\"][\"pd\"] = 0.0\nnetwork_data[\"bus\"][\"3\"][\"qd\"] = 0.0\n\nrun_opf(network_data, ACPPowerModel, IpoptSolver())For additional details about the network data, see the PowerModels Data Format section."
},

{
    "location": "quickguide.html#Inspecting-the-Formulation-1",
    "page": "Getting Started",
    "title": "Inspecting the Formulation",
    "category": "section",
    "text": "The following example demonstrates how to break a run_opf call into seperate model building and solving steps.  This allows inspection of the JuMP model created by PowerModels for the AC-OPF problem,pm = build_generic_model(\"nesta_case3_lmbd.m\", ACPPowerModel, PowerModels.post_opf)\n\nprint(pm.model)\n\nsolve_generic_model(pm, IpoptSolver())"
},

{
    "location": "formulations.html#",
    "page": "Network Formulations",
    "title": "Network Formulations",
    "category": "page",
    "text": ""
},

{
    "location": "formulations.html#Network-Formulations-1",
    "page": "Network Formulations",
    "title": "Network Formulations",
    "category": "section",
    "text": ""
},

{
    "location": "formulations.html#Type-Hierarchy-1",
    "page": "Network Formulations",
    "title": "Type Hierarchy",
    "category": "section",
    "text": "We begin with the top of the hierarchy, where we can distinguish between AC and DC power flow models.AbstractACPForm <: AbstractPowerFormulation\nAbstractDCPForm <: AbstractPowerFormulation\nAbstractWRForm <: AbstractPowerFormulationFrom there, different forms for ACP and DCP are possible:StandardACPForm <: AbstractACPForm\nAPIACPForm <: AbstractACPForm\n\nStandardDCPForm <: AbstractDCPForm\n\nSOCWRForm <: AbstractWRForm\nQCWRForm <: AbstractWRForm"
},

{
    "location": "formulations.html#Power-Models-1",
    "page": "Network Formulations",
    "title": "Power Models",
    "category": "section",
    "text": "Each of these forms can be used as the type parameter for a PowerModel:ACPPowerModel = GenericPowerModel{StandardACPForm}\nAPIACPPowerModel = GenericPowerModel{APIACPForm}\n\nDCPPowerModel = GenericPowerModel{StandardDCPForm}\n\nSOCWRPowerModel = GenericPowerModel{SOCWRForm}\nQCWRPowerModel = GenericPowerModel{QCWRForm}"
},

{
    "location": "formulations.html#User-Defined-Abstractions-1",
    "page": "Network Formulations",
    "title": "User-Defined Abstractions",
    "category": "section",
    "text": "Consider the class of conic formulations for power flow models. One way of modelling them in this package is through the following type hierarchy:AbstractConicPowerFormulation <: AbstractPowerFormulation\nAbstractWRMForm <: AbstractConicPowerFormulation\n\nSDPWRMForm <: AbstractWRMForm\nSDPWRMPowerModel = GenericPowerModel{SDPWRMForm}The user-defined abstractions do not have to begin from the root AbstractPowerFormulation abstract type, and can begin from an intermediate abstract type. For example, in the following snippet:AbstractDCPLLForm <: AbstractDCPForm\n\nStandardDCPLLForm <: AbstractDCPLLForm\nDCPLLPowerModel = GenericPowerModel{StandardDCPLLForm}"
},

{
    "location": "specifications.html#",
    "page": "Problem Specifications",
    "title": "Problem Specifications",
    "category": "page",
    "text": ""
},

{
    "location": "specifications.html#Problem-Specifications-1",
    "page": "Problem Specifications",
    "title": "Problem Specifications",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#OPF-Specifications-1",
    "page": "Problem Specifications",
    "title": "OPF Specifications",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#Objective-1",
    "page": "Problem Specifications",
    "title": "Objective",
    "category": "section",
    "text": "objective_min_fuel_cost(pm)"
},

{
    "location": "specifications.html#Variables-1",
    "page": "Problem Specifications",
    "title": "Variables",
    "category": "section",
    "text": "variable_voltage(pm)\nvariable_active_generation(pm)\nvariable_reactive_generation(pm)\nvariable_line_flow(pm)"
},

{
    "location": "specifications.html#Constraints-1",
    "page": "Problem Specifications",
    "title": "Constraints",
    "category": "section",
    "text": "constraint_theta_ref(pm)\nconstraint_voltage(pm)\nfor (i,bus) in pm.ref[:bus]\n    constraint_kcl_shunt(pm, bus)\nend\nfor (i,branch) in pm.ref[:branch]\n    constraint_ohms_yt_from(pm, branch)\n    constraint_ohms_yt_to(pm, branch)\n\n    constraint_phase_angle_difference(pm, branch)\n\n    constraint_thermal_limit_from(pm, branch)\n    constraint_thermal_limit_to(pm, branch)\nend"
},

{
    "location": "specifications.html#OTS-Specifications-1",
    "page": "Problem Specifications",
    "title": "OTS Specifications",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#General-Assumptions-1",
    "page": "Problem Specifications",
    "title": "General Assumptions",
    "category": "section",
    "text": "if the branch status is 0 in the input, it is out of service and forced to 0 in OTS\nthe network will be maintained as one connected component (i.e. at least n-1 edges)"
},

{
    "location": "specifications.html#Variables-2",
    "page": "Problem Specifications",
    "title": "Variables",
    "category": "section",
    "text": "variable_line_indicator(pm)\nvariable_voltage_on_off(pm)\nvariable_active_generation(pm)\nvariable_reactive_generation(pm)\nvariable_line_flow(pm)"
},

{
    "location": "specifications.html#Objective-2",
    "page": "Problem Specifications",
    "title": "Objective",
    "category": "section",
    "text": "objective_min_fuel_cost(pm)"
},

{
    "location": "specifications.html#Constraints-2",
    "page": "Problem Specifications",
    "title": "Constraints",
    "category": "section",
    "text": "constraint_theta_ref(pm)\nconstraint_voltage_on_off(pm)\nfor (i,bus) in pm.ref[:bus]\n    constraint_kcl_shunt(pm, bus)\nend\nfor (i,branch) in pm.ref[:branch]\n    constraint_ohms_yt_from_on_off(pm, branch)\n    constraint_ohms_yt_to_on_off(pm, branch)\n\n    constraint_phase_angle_difference_on_off(pm, branch)\n\n    constraint_thermal_limit_from_on_off(pm, branch)\n    constraint_thermal_limit_to_on_off(pm, branch)\nend"
},

{
    "location": "specifications.html#Power-Flow-(PF)-Specifications-1",
    "page": "Problem Specifications",
    "title": "Power Flow (PF) Specifications",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#Assumptions-1",
    "page": "Problem Specifications",
    "title": "Assumptions",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#Variables-3",
    "page": "Problem Specifications",
    "title": "Variables",
    "category": "section",
    "text": "variable_voltage(pm, bounded = false)\nvariable_active_generation(pm, bounded = false)\nvariable_reactive_generation(pm, bounded = false)\nvariable_line_flow(pm, bounded = false)"
},

{
    "location": "specifications.html#Constraints-3",
    "page": "Problem Specifications",
    "title": "Constraints",
    "category": "section",
    "text": "constraint_theta_ref(pm)\nconstraint_voltage_magnitude_setpoint(pm, pm.ref[:bus][pm.ref[:ref_bus]])\nconstraint_voltage(pm)\n\nfor (i,bus) in pm.ref[:bus]\n    constraint_kcl_shunt(pm, bus)\n\n    # PV Bus Constraints\n    if length(pm.ref[:bus_gens][i]) > 0 && i != pm.ref[:ref_bus]\n        # this assumes inactive generators are filtered out of bus_gens\n        @assert bus[\"bus_type\"] == 2\n\n        # soft equality needed becouse v in file is not precice enough to ensure feasiblity\n        constraint_voltage_magnitude_setpoint(pm, bus; epsilon = 0.00001)\n        for j in pm.ref[:bus_gens][i]\n            constraint_active_gen_setpoint(pm, pm.ref[:gen][j])\n        end\n    end\nend\n\nfor (i,branch) in pm.ref[:branch]\n    constraint_ohms_yt_from(pm, branch)\n    constraint_ohms_yt_to(pm, branch)\nend"
},

{
    "location": "specifications.html#TNEP-Specifications-1",
    "page": "Problem Specifications",
    "title": "TNEP Specifications",
    "category": "section",
    "text": ""
},

{
    "location": "specifications.html#Objective-3",
    "page": "Problem Specifications",
    "title": "Objective",
    "category": "section",
    "text": "objective_tnep_cost(pm)"
},

{
    "location": "specifications.html#Variables-4",
    "page": "Problem Specifications",
    "title": "Variables",
    "category": "section",
    "text": "variable_line_ne(pm) \nvariable_voltage(pm)\nvariable_voltage_ne(pm)\nvariable_active_generation(pm)\nvariable_reactive_generation(pm)\nvariable_line_flow(pm)\nvariable_line_flow_ne(pm)"
},

{
    "location": "specifications.html#Constraints-4",
    "page": "Problem Specifications",
    "title": "Constraints",
    "category": "section",
    "text": "constraint_theta_ref(pm)\nconstraint_voltage(pm)\nconstraint_voltage_ne(pm)\n\nfor (i,bus) in pm.ref[:bus]\n    constraint_kcl_shunt_ne(pm, bus)\nend\n\nfor (i,branch) in pm.ref[:branch]\n    constraint_ohms_yt_from(pm, branch)\n    constraint_ohms_yt_to(pm, branch)\n\n    constraint_phase_angle_difference(pm, branch)\n\n    constraint_thermal_limit_from(pm, branch)\n    constraint_thermal_limit_to(pm, branch)\nend \n\nfor (i,branch) in pm.ref[:ne_branch]\n    constraint_ohms_yt_from_ne(pm, branch)\n    constraint_ohms_yt_to_ne(pm, branch) \n\n    constraint_phase_angle_difference_ne(pm, branch)\n\n    constraint_thermal_limit_from_ne(pm, branch)\n    constraint_thermal_limit_to_ne(pm, branch)\nend"
},

{
    "location": "objective.html#",
    "page": "Objective",
    "title": "Objective",
    "category": "page",
    "text": ""
},

{
    "location": "objective.html#PowerModels.objective_min_fuel_cost-Tuple{PowerModels.GenericPowerModel{T<:PowerModels.AbstractConicPowerFormulation}}",
    "page": "Objective",
    "title": "PowerModels.objective_min_fuel_cost",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "objective.html#PowerModels.objective_min_fuel_cost-Tuple{PowerModels.GenericPowerModel}",
    "page": "Objective",
    "title": "PowerModels.objective_min_fuel_cost",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "objective.html#PowerModels.objective_tnep_cost-Tuple{PowerModels.GenericPowerModel}",
    "page": "Objective",
    "title": "PowerModels.objective_tnep_cost",
    "category": "Method",
    "text": "Cost of building lines\n\n\n\n"
},

{
    "location": "objective.html#Objective-1",
    "page": "Objective",
    "title": "Objective",
    "category": "section",
    "text": "Modules = [PowerModels]\nPages   = [\"core/objective.jl\"]\nOrder   = [:function]\nPrivate  = true"
},

{
    "location": "variables.html#",
    "page": "Variables",
    "title": "Variables",
    "category": "page",
    "text": ""
},

{
    "location": "variables.html#PowerModels.getstart",
    "page": "Variables",
    "title": "PowerModels.getstart",
    "category": "Function",
    "text": "extracts the start value\n\n\n\n"
},

{
    "location": "variables.html#PowerModels.variable_active_generation-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_active_generation",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_active_line_flow-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_active_line_flow",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_active_line_flow_ne-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_active_line_flow_ne",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_generation-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_generation",
    "category": "Method",
    "text": "generates variables for both active and reactive generation\n\n\n\n"
},

{
    "location": "variables.html#PowerModels.variable_line_flow-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_line_flow",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_line_flow_ne-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_line_flow_ne",
    "category": "Method",
    "text": "generates variables for both active and reactive line_flow_ne\n\n\n\n"
},

{
    "location": "variables.html#PowerModels.variable_line_indicator-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_line_indicator",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_line_ne-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_line_ne",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_phase_angle-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_phase_angle",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_reactive_generation-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_reactive_generation",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_reactive_line_flow-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_reactive_line_flow",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_reactive_line_flow_ne-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_reactive_line_flow_ne",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_voltage_magnitude-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_voltage_magnitude",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_voltage_magnitude_sqr-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_voltage_magnitude_sqr",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_voltage_magnitude_sqr_from_on_off-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_voltage_magnitude_sqr_from_on_off",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#PowerModels.variable_voltage_magnitude_sqr_to_on_off-Tuple{PowerModels.GenericPowerModel}",
    "page": "Variables",
    "title": "PowerModels.variable_voltage_magnitude_sqr_to_on_off",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "variables.html#Variables-1",
    "page": "Variables",
    "title": "Variables",
    "category": "section",
    "text": "We provide the following methods to provide a compositional approach for defining common variables used in power flow models. These methods should always be defined over \"GenericPowerModel\".Modules = [PowerModels]\nPages   = [\"core/variable.jl\"]\nOrder   = [:type, :function]\nPrivate  = true"
},

{
    "location": "constraints.html#",
    "page": "Constraints",
    "title": "Constraints",
    "category": "page",
    "text": ""
},

{
    "location": "constraints.html#Constraints-1",
    "page": "Constraints",
    "title": "Constraints",
    "category": "section",
    "text": "CurrentModule = PowerModels"
},

{
    "location": "constraints.html#Constraint-Templates-1",
    "page": "Constraints",
    "title": "Constraint Templates",
    "category": "section",
    "text": "Constraint templates help simplify data wrangling across multiple Power Flow formulations by providing an abstraction layer between the network data and network constraint definitions. The constraint template's job is to extract the required parameters from a given network data structure and pass the data as named arguments to the Power Flow formulations.These templates should be defined over GenericPowerModel and should not refer to model variables. For more details, see the files: core/constraint_template.jl and core/constraint.jl."
},

{
    "location": "constraints.html#PowerModels.constraint_active_gen_setpoint",
    "page": "Constraints",
    "title": "PowerModels.constraint_active_gen_setpoint",
    "category": "Function",
    "text": "\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_reactive_gen_setpoint",
    "page": "Constraints",
    "title": "PowerModels.constraint_reactive_gen_setpoint",
    "category": "Function",
    "text": "\n\n\n\ndo nothing, this model does not have reactive variables\n\n\n\n"
},

{
    "location": "constraints.html#Generator-Constraints-1",
    "page": "Constraints",
    "title": "Generator Constraints",
    "category": "section",
    "text": "constraint_active_gen_setpoint\nconstraint_reactive_gen_setpoint"
},

{
    "location": "constraints.html#Bus-Constraints-1",
    "page": "Constraints",
    "title": "Bus Constraints",
    "category": "section",
    "text": ""
},

{
    "location": "constraints.html#PowerModels.constraint_theta_ref",
    "page": "Constraints",
    "title": "PowerModels.constraint_theta_ref",
    "category": "Function",
    "text": "\n\n\n\n\n\nDo nothing, no way to represent this in these variables\n\n\n\n\n\nDo nothing, no way to represent this in these variables\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_voltage_magnitude_setpoint",
    "page": "Constraints",
    "title": "PowerModels.constraint_voltage_magnitude_setpoint",
    "category": "Function",
    "text": "\n\n\n\ndo nothing, this model does not have voltage variables\n\n\n\n"
},

{
    "location": "constraints.html#Setpoint-Constraints-1",
    "page": "Constraints",
    "title": "Setpoint Constraints",
    "category": "section",
    "text": "constraint_theta_ref\nconstraint_voltage_magnitude_setpoint"
},

{
    "location": "constraints.html#PowerModels.constraint_kcl_shunt",
    "page": "Constraints",
    "title": "PowerModels.constraint_kcl_shunt",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_kcl_shunt_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_kcl_shunt_ne",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#KCL-Constraints-1",
    "page": "Constraints",
    "title": "KCL Constraints",
    "category": "section",
    "text": "constraint_kcl_shunt\nconstraint_kcl_shunt_ne"
},

{
    "location": "constraints.html#Branch-Constraints-1",
    "page": "Constraints",
    "title": "Branch Constraints",
    "category": "section",
    "text": ""
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_from",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_from",
    "category": "Function",
    "text": "\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_to",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_to",
    "category": "Function",
    "text": "\n\nDo nothing, this model is symmetric\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_y_from",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_y_from",
    "category": "Function",
    "text": "\n\nCreates Ohms constraints for AC models (y post fix indicates that Y values are in rectangular form)\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_y_to",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_y_to",
    "category": "Function",
    "text": "\n\n\n\n"
},

{
    "location": "constraints.html#Ohm's-Law-Constraints-1",
    "page": "Constraints",
    "title": "Ohm's Law Constraints",
    "category": "section",
    "text": "constraint_ohms_yt_from\nconstraint_ohms_yt_to\nconstraint_ohms_y_from\nconstraint_ohms_y_to"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_from_on_off",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_from_on_off",
    "category": "Function",
    "text": "\n\n\n\n\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\nCreates Ohms constraints (yt post fix indicates that Y and T values are in rectangular form)\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_to_on_off",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_to_on_off",
    "category": "Function",
    "text": "\n\n\n\nDo nothing, this model is symetric\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_from_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_from_ne",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_ohms_yt_to_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_ohms_yt_to_ne",
    "category": "Function",
    "text": "\n\n\n\nDo nothing, this model is symmetric\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#On/Off-Ohm's-Law-Constraints-1",
    "page": "Constraints",
    "title": "On/Off Ohm's Law Constraints",
    "category": "section",
    "text": "constraint_ohms_yt_from_on_off\nconstraint_ohms_yt_to_on_off\nconstraint_ohms_yt_from_ne\nconstraint_ohms_yt_to_ne"
},

{
    "location": "constraints.html#PowerModels.constraint_power_magnitude_sqr",
    "page": "Constraints",
    "title": "PowerModels.constraint_power_magnitude_sqr",
    "category": "Function",
    "text": "\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_power_magnitude_link",
    "page": "Constraints",
    "title": "PowerModels.constraint_power_magnitude_link",
    "category": "Function",
    "text": "\n\n\n\n"
},

{
    "location": "constraints.html#Current-1",
    "page": "Constraints",
    "title": "Current",
    "category": "section",
    "text": "constraint_power_magnitude_sqr\nconstraint_power_magnitude_link"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_from",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_from",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_to",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_to",
    "category": "Function",
    "text": "\n\n\n\n\n\nDo nothing, this model is symmetric\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_from_on_off",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_from_on_off",
    "category": "Function",
    "text": "\n\n\n\nGeneric on/off thermal limit constraint\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_to_on_off",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_to_on_off",
    "category": "Function",
    "text": "\n\n\n\nnothing to do, from handles both sides\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_from_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_from_ne",
    "category": "Function",
    "text": "\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_thermal_limit_to_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_thermal_limit_to_ne",
    "category": "Function",
    "text": "\n\n\n\nnothing to do, from handles both sides\n\n\n\n\n\n"
},

{
    "location": "constraints.html#Thermal-Limit-Constraints-1",
    "page": "Constraints",
    "title": "Thermal Limit Constraints",
    "category": "section",
    "text": "constraint_thermal_limit_from\nconstraint_thermal_limit_to\nconstraint_thermal_limit_from_on_off\nconstraint_thermal_limit_to_on_off\nconstraint_thermal_limit_from_ne\nconstraint_thermal_limit_to_ne"
},

{
    "location": "constraints.html#PowerModels.constraint_phase_angle_difference",
    "page": "Constraints",
    "title": "PowerModels.constraint_phase_angle_difference",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_phase_angle_difference_on_off",
    "page": "Constraints",
    "title": "PowerModels.constraint_phase_angle_difference_on_off",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#PowerModels.constraint_phase_angle_difference_ne",
    "page": "Constraints",
    "title": "PowerModels.constraint_phase_angle_difference_ne",
    "category": "Function",
    "text": "\n\n\n\n\n\n\n\n"
},

{
    "location": "constraints.html#Phase-Angle-Difference-Constraints-1",
    "page": "Constraints",
    "title": "Phase Angle Difference Constraints",
    "category": "section",
    "text": "constraint_phase_angle_difference\nconstraint_phase_angle_difference_on_off\nconstraint_phase_angle_difference_ne"
},

{
    "location": "constraints.html#PowerModels.constraint_loss_lb",
    "page": "Constraints",
    "title": "PowerModels.constraint_loss_lb",
    "category": "Function",
    "text": "\n\n\n\n"
},

{
    "location": "constraints.html#Loss-Constraints-1",
    "page": "Constraints",
    "title": "Loss Constraints",
    "category": "section",
    "text": "constraint_loss_lb"
},

{
    "location": "constraints.html#Commonly-Used-Constraints-1",
    "page": "Constraints",
    "title": "Commonly Used Constraints",
    "category": "section",
    "text": "The following methods generally assume that the model contains p and q values for branches line flows and bus flow conservation."
},

{
    "location": "constraints.html#Generic-thermal-limit-constraint-1",
    "page": "Constraints",
    "title": "Generic thermal limit constraint",
    "category": "section",
    "text": "constraint_thermal_limit_from(pm::GenericPowerModel, f_idx, rate_a)\nconstraint_thermal_limit_to(pm::GenericPowerModel, t_idx, rate_a)"
},

{
    "location": "constraints.html#Generic-on/off-thermal-limit-constraint-1",
    "page": "Constraints",
    "title": "Generic on/off thermal limit constraint",
    "category": "section",
    "text": "constraint_thermal_limit_from_on_off(pm::GenericPowerModel, i, f_idx, rate_a)\nconstraint_thermal_limit_to_on_off(pm::GenericPowerModel, i, t_idx, rate_a)\nconstraint_thermal_limit_from_ne(pm::GenericPowerModel, i, f_idx, rate_a)\nconstraint_thermal_limit_to_ne(pm::GenericPowerModel, i, t_idx, rate_a)\nconstraint_active_gen_setpoint(pm::GenericPowerModel, i, pg)\nconstraint_reactive_gen_setpoint(pm::GenericPowerModel, i, qg)"
},

{
    "location": "relaxations.html#",
    "page": "Relaxation Schemes",
    "title": "Relaxation Schemes",
    "category": "page",
    "text": ""
},

{
    "location": "relaxations.html#PowerModels.cut_complex_product_and_angle_difference-Tuple{Any,Any,Any,Any,Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.cut_complex_product_and_angle_difference",
    "category": "Method",
    "text": "In the literature this constraints are called the Lifted Nonlinear Cuts (LNCs)\n\n\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_complex_product-Tuple{Any,Any,Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_complex_product",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_complex_product_on_off-Tuple{Any,Any,Any,Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_complex_product_on_off",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_cos-Tuple{Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_cos",
    "category": "Method",
    "text": "general relaxation of a cosine term\n\n\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_equality_on_off-Tuple{Any,Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_equality_on_off",
    "category": "Method",
    "text": "\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_product-Tuple{Any,Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_product",
    "category": "Method",
    "text": "general relaxation of binlinear term (McCormick)\n\n\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_sin-Tuple{Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_sin",
    "category": "Method",
    "text": "general relaxation of a sin term\n\n\n\n"
},

{
    "location": "relaxations.html#PowerModels.relaxation_sqr-Tuple{Any,Any,Any}",
    "page": "Relaxation Schemes",
    "title": "PowerModels.relaxation_sqr",
    "category": "Method",
    "text": "general relaxation of a square term\n\n\n\n"
},

{
    "location": "relaxations.html#Relaxation-Schemes-1",
    "page": "Relaxation Schemes",
    "title": "Relaxation Schemes",
    "category": "section",
    "text": "Modules = [PowerModels]\nPages   = [\"core/relaxation_scheme.jl\"]\nOrder   = [:function]\nPrivate  = true"
},

{
    "location": "parser.html#",
    "page": "File IO",
    "title": "File IO",
    "category": "page",
    "text": ""
},

{
    "location": "parser.html#File-IO-1",
    "page": "File IO",
    "title": "File IO",
    "category": "section",
    "text": "CurrentModule = PowerModels"
},

{
    "location": "parser.html#PowerModels.parse_file",
    "page": "File IO",
    "title": "PowerModels.parse_file",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.parse_json",
    "page": "File IO",
    "title": "PowerModels.parse_json",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#General-Data-Formats-1",
    "page": "File IO",
    "title": "General Data Formats",
    "category": "section",
    "text": "parse_file\nparse_json"
},

{
    "location": "parser.html#PowerModels.parse_matpower",
    "page": "File IO",
    "title": "PowerModels.parse_matpower",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.parse_matpower_data",
    "page": "File IO",
    "title": "PowerModels.parse_matpower_data",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.standardize_cost_order",
    "page": "File IO",
    "title": "PowerModels.standardize_cost_order",
    "category": "Function",
    "text": "ensures all costs functions are quadratic and reverses their order\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.update_branch_transformer_settings",
    "page": "File IO",
    "title": "PowerModels.update_branch_transformer_settings",
    "category": "Function",
    "text": "sets all line transformer taps to 1.0, to simplify line models\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.merge_generator_cost_data",
    "page": "File IO",
    "title": "PowerModels.merge_generator_cost_data",
    "category": "Function",
    "text": "merges generator cost functions into generator data, if costs exist\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.merge_bus_name_data",
    "page": "File IO",
    "title": "PowerModels.merge_bus_name_data",
    "category": "Function",
    "text": "merges bus name data into buses, if names exist\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.parse_cell",
    "page": "File IO",
    "title": "PowerModels.parse_cell",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.parse_matrix",
    "page": "File IO",
    "title": "PowerModels.parse_matrix",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.parse_matlab_data",
    "page": "File IO",
    "title": "PowerModels.parse_matlab_data",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.split_line",
    "page": "File IO",
    "title": "PowerModels.split_line",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.add_line_delimiter",
    "page": "File IO",
    "title": "PowerModels.add_line_delimiter",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.extract_assignment",
    "page": "File IO",
    "title": "PowerModels.extract_assignment",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.extract_mpc_assignment",
    "page": "File IO",
    "title": "PowerModels.extract_mpc_assignment",
    "category": "Function",
    "text": "\n\n"
},

{
    "location": "parser.html#PowerModels.type_value",
    "page": "File IO",
    "title": "PowerModels.type_value",
    "category": "Function",
    "text": "Attempts to determine the type of a string extracted from a matlab file\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.type_array",
    "page": "File IO",
    "title": "PowerModels.type_array",
    "category": "Function",
    "text": "Attempts to determine the type of an array of strings extracted from a matlab file\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.build_typed_dict",
    "page": "File IO",
    "title": "PowerModels.build_typed_dict",
    "category": "Function",
    "text": "takes a list of list of strings and turns it into a list of typed dictionaries\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.extend_case_data",
    "page": "File IO",
    "title": "PowerModels.extend_case_data",
    "category": "Function",
    "text": "extends a give case data with typed dictionary data\n\n\n\n"
},

{
    "location": "parser.html#PowerModels.mp_data_to_pm_data",
    "page": "File IO",
    "title": "PowerModels.mp_data_to_pm_data",
    "category": "Function",
    "text": "converts arrays of objects into a dicts with lookup by \"index\"\n\n\n\n"
},

{
    "location": "parser.html#Matpower-Data-Files-1",
    "page": "File IO",
    "title": "Matpower Data Files",
    "category": "section",
    "text": "The following two methods are the main exported methods for parsing matpower data files:parse_matpower\nparse_matpower_dataWe also provide the following (internal) helper methods:standardize_cost_order\nupdate_branch_transformer_settings\nmerge_generator_cost_data\nmerge_bus_name_data\nparse_cell\nparse_matrix\nparse_matlab_data\nsplit_line\nadd_line_delimiter\nextract_assignment\nextract_mpc_assignment\ntype_value\ntype_array\nbuild_typed_dict\nextend_case_data\nmp_data_to_pm_data"
},

{
    "location": "data.html#",
    "page": "Data Formats",
    "title": "Data Formats",
    "category": "page",
    "text": ""
},

{
    "location": "data.html#PowerModels-Data-Format-1",
    "page": "Data Formats",
    "title": "PowerModels Data Format",
    "category": "section",
    "text": ""
},

{
    "location": "data.html#The-Network-Data-Dictionary-1",
    "page": "Data Formats",
    "title": "The Network Data Dictionary",
    "category": "section",
    "text": "Internally PowerModels utilizes a dictionary to store network data. The dictionary uses strings as key values so it can be serialized to JSON for algorithmic data exchange.The data dictionary organization and key names are designed to be consistent with the Matpower file format and should be familiar to power system researchers.The network data dictionary structure is roughly as follows:{\n\"name\":<string>,\n\"version\":\"2\",\n\"baseMVA\":<float>,\n\"bus\":{\n    \"1\":{\n        \"index\":<int>,\n        \"bus_type\":<int>,\n        \"pd\":<float>,\n        \"qd\":<float>,\n        ...\n    },\n    \"2\":{...},\n    ...\n},\n\"gen\":{\n    \"1\":{\n        \"index\":<int>,\n        \"gen_bus\":<int>,\n        \"pg\":<float>,\n        \"qg\":<float>,\n        ...\n    },\n    \"2\":{...},\n    ...\n},\n\"branch\":{\n    \"1\":{\n        \"index\":<int>,\n        \"f_bus\":<int>,\n        \"t_bus\":<int>,\n        \"br_r\":<int>,\n        ...\n    },\n    \"2\":{...},\n    ...\n}\n}The following commands can be used to explore the network data dictionary generated by a given Matpower data file,network_data = PowerModels.parse_file(\"nesta_case3_lmbd.m\")\ndisplay(network_data)For a detailed list of all possible parameters refer to the specification document provided with Matpower.  "
},

{
    "location": "data.html#Noteworthy-Differences-from-Matpower-Data-Files-1",
    "page": "Data Formats",
    "title": "Noteworthy Differences from Matpower Data Files",
    "category": "section",
    "text": "The PowerModels network data dictionary differs from the Matpower format in the following ways,All PowerModels components have an index parameter, which can be used to uniquely identify that network element.\nAll network parameters are in per-unit and angles are in radians.\nAll non-transformer branches are given nominal transformer values (i.e. a tap of 1.0 and a shift of 0).\nAll branches have a transformer field indicating if they are a transformer or not.\nWhen present, the gencost data is incorporated into the gen data, the column names remain the same.\nOnly quadratic active power generation cost functions are supported at this time.\nSpecial treatment is given to the optional ne_branch matrix to support the TNEP problem."
},

{
    "location": "data.html#Working-with-Matpower-Data-Files-1",
    "page": "Data Formats",
    "title": "Working with Matpower Data Files",
    "category": "section",
    "text": "The data exchange via JSON files is ideal for building algorithms, however it is hard to for humans to read and process.  To that end PowerModels also has extensive support for parsing Matpower network files in the .m format.In addition to parsing the standard Matpower parameters, PowerModels also supports extending the standard Matpower format in a number of ways as illustrated by the following examples.  In these examples JSON document fragments are used to indicate the structure of the PowerModel dictionary."
},

{
    "location": "data.html#Single-Values-1",
    "page": "Data Formats",
    "title": "Single Values",
    "category": "section",
    "text": "Single values are added to the root of the dictionary as follows,mpc.const_float = 4.56becomes{\n\"const_float\": 4.56\n}"
},

{
    "location": "data.html#Nonstandard-Matrices-1",
    "page": "Data Formats",
    "title": "Nonstandard Matrices",
    "category": "section",
    "text": "Nonstandard matrices can be added as follows,mpc.areas = [\n    1   1;\n    2   3;\n];becomes{\n\"areas\":{\n    \"1\":{\n        \"index\":1,\n        \"col_1\":1,\n        \"col_2\":1\n    },\n    \"2\":{\n        \"index\":1,\n        \"col_1\":2,\n        \"col_2\":3\n    }\n}\n}"
},

{
    "location": "data.html#Column-Names-1",
    "page": "Data Formats",
    "title": "Column Names",
    "category": "section",
    "text": "Column names can be given to nonstandard matrices using the following special comment,%column_names%  area    refbus\nmpc.areas_named = [\n    4   5;\n    5   6;\n];becomes{\n\"areas\":{\n    \"1\":{\n        \"index\":1,\n        \"area\":4,\n        \"refbus\":5\n    },\n    \"2\":{\n        \"index\":2,\n        \"area\":5,\n        \"refbus\":6\n    }\n}\n}"
},

{
    "location": "data.html#Standard-Matrix-Extensions-1",
    "page": "Data Formats",
    "title": "Standard Matrix Extensions",
    "category": "section",
    "text": "Finally, if a nonstandard matrix's name extends a current Matpower matrix name with an underscore, then its values will be merged with the original Matpower component data.  Note that this feature requires that the nonstandard matrix has column names and has the same number of rows as the original matrix (similar to the gencost matrix in the Matpower format).  For example,%column_names%  rate_i  rate_p\nmpc.branch_limit = [\n    50.2    45;\n    36  60.1;\n    12  30;\n];becomes{\n\"branch\":{\n    \"1\":{\n        \"index\":1,\n        ...(all pre existing fields)...\n        \"rate_i\":50.2,\n        \"rate_p\":45\n    },\n    \"2\":{\n        \"index\":2,\n        ...(all pre existing fields)...\n        \"rate_i\":36,\n        \"rate_p\":60.1\n    },\n    \"3\":{\n        \"index\":3,\n        ...(all pre existing fields)...\n        \"rate_i\":12,\n        \"rate_p\":30\n    }\n}\n}"
},

]}
